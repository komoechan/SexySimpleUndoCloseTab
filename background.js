// Background script for handling closed tabs and context menu
let maxRecentItems = 100; // 默认值
const tabCache = new Map();

// 使用更短的徽章文本格式化函数
function formatBadgeText(count) {
    if (count > 999) return `${Math.floor(count/1000)}k`;
    return count.toString();
}

// 更新图标计数器
async function updateBadgeCount() {
    const { closedTabs = [] } = await chrome.storage.local.get(['closedTabs']);
    await chrome.action.setBadgeText({ text: formatBadgeText(closedTabs.length) });
    await chrome.action.setBadgeBackgroundColor({ color: '#6a1b9a' });
    await chrome.action.setBadgeTextColor({ color: '#ffffff' });
}

// 初始化时获取最大记录数设置
async function initializeMaxRecent() {
    try {
        const { maxRecent = 100 } = await chrome.storage.sync.get(['maxRecent']);
        maxRecentItems = Math.max(1, Math.min(20000, maxRecent)); // 确保值在有效范围内
    } catch (error) {
        console.error('Error initializing maxRecent:', error);
        maxRecentItems = 100; // 出错时使用默认值
    }
}

// 监听标签页更新事件
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url || changeInfo.title) {
        tabCache.set(tabId, {
            url: tab.url,
            title: tab.title || tab.url,
            favIconUrl: tab.favIconUrl
        });
    }
});

// 监听标签页创建事件
chrome.tabs.onCreated.addListener((tab) => {
    tabCache.set(tab.id, {
        url: tab.url,
        title: tab.title || tab.url,
        favIconUrl: tab.favIconUrl
    });
});

// 存储关闭的标签页
chrome.tabs.onRemoved.addListener(async (tabId, removeInfo) => {
    if (removeInfo.isWindowClosing) return;

    const cachedTab = tabCache.get(tabId);
    if (!cachedTab || !cachedTab.url || cachedTab.url === 'chrome://newtab/') return;

    try {
        const { closedTabs = [] } = await chrome.storage.local.get(['closedTabs']);
        
        // 检查是否已经存在相同的 URL
        const existingIndex = closedTabs.findIndex(tab => tab.url === cachedTab.url);
        if (existingIndex !== -1) {
            closedTabs.splice(existingIndex, 1);
        }

        closedTabs.unshift({
            id: Date.now(),
            url: cachedTab.url,
            title: cachedTab.title || cachedTab.url,
            favicon: cachedTab.favIconUrl || '',
            closedAt: Date.now()
        });

        if (closedTabs.length > maxRecentItems) {
            closedTabs.length = maxRecentItems;
        }

        await chrome.storage.local.set({ closedTabs });
        await updateBadgeCount();
        tabCache.delete(tabId);
    } catch (error) {
        console.error('Error handling closed tab:', error);
    }
});

// 初始化设置
chrome.runtime.onInstalled.addListener(async () => {
    await initializeMaxRecent();
    
    const tabs = await chrome.tabs.query({});
    tabs.forEach(tab => {
        tabCache.set(tab.id, {
            url: tab.url,
            title: tab.title || tab.url,
            favIconUrl: tab.favIconUrl
        });
    });
    
    await updateBadgeCount();

    // 设置初始主题和语言，保持默认值不变
    const currentSettings = await chrome.storage.sync.get(['theme', 'maxRecent', 'width', 'language']);
    await chrome.storage.sync.set({ 
        theme: currentSettings.theme || 'light', 
        maxRecent: currentSettings.maxRecent || 20000, 
        width: currentSettings.width || 400,
        language: currentSettings.language || 'en'
    });
});

// 监听主题变化并同步到所有页面
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && changes.theme) {
        const newTheme = changes.theme.newValue;
        // 删除使用 localStorage 的代码，因为在 background script 中无法使用
        // 主题变化已经保存在 chrome.storage.sync 中，其他页面可以直接监听
    }
});

// 监听设置变化
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && changes.maxRecent) {
        const newValue = changes.maxRecent.newValue;
        maxRecentItems = Math.max(1, Math.min(20000, newValue)); // 确保值在有效范围内
    }
});

// 导出一些工具函数供其他模块使用
export { updateBadgeCount };