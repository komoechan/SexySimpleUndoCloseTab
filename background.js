// Background script for handling closed tabs and context menu
let maxRecentItems = 100; // 默认值

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

// 更新标签页缓存
async function updateTabCache(tab) {
    if (tab && tab.id && tab.url && !tab.url.startsWith('chrome://')) {
        const { tabsCache = {} } = await chrome.storage.local.get(['tabsCache']);
        tabsCache[tab.id] = {
            url: tab.url,
            title: tab.title || tab.url,
            favIconUrl: tab.favIconUrl,
            lastUpdated: Date.now()
        };
        await chrome.storage.local.set({ tabsCache });
    }
}

// 从缓存中获取标签页信息
async function getTabFromCache(tabId) {
    const { tabsCache = {} } = await chrome.storage.local.get(['tabsCache']);
    return tabsCache[tabId];
}

// 删除缓存中的标签页信息
async function removeTabFromCache(tabId) {
    const { tabsCache = {} } = await chrome.storage.local.get(['tabsCache']);
    delete tabsCache[tabId];
    await chrome.storage.local.set({ tabsCache });
}

// 获取并缓存所有标签页信息
async function cacheAllTabs() {
    try {
        const tabs = await chrome.tabs.query({});
        const tabsCache = {};
        
        for (const tab of tabs) {
            if (tab && tab.id && tab.url && !tab.url.startsWith('chrome://')) {
                tabsCache[tab.id] = {
                    url: tab.url,
                    title: tab.title || tab.url,
                    favIconUrl: tab.favIconUrl,
                    lastUpdated: Date.now()
                };
            }
        }
        
        await chrome.storage.local.set({ tabsCache });
        console.log('Successfully cached all tabs');
    } catch (error) {
        console.error('Error caching all tabs:', error);
    }
}

// 清理过期的标签页缓存
async function cleanupTabsCache() {
    try {
        const { tabsCache = {} } = await chrome.storage.local.get(['tabsCache']);
        const currentTabs = await chrome.tabs.query({});
        const currentTabIds = new Set(currentTabs.map(tab => tab.id));
        
        // 删除已不存在的标签页的缓存
        for (const tabId in tabsCache) {
            if (!currentTabIds.has(parseInt(tabId))) {
                delete tabsCache[tabId];
            }
        }
        
        await chrome.storage.local.set({ tabsCache });
    } catch (error) {
        console.error('Error cleaning up tabs cache:', error);
    }
}

// 监听标签页更新事件
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' || changeInfo.title || changeInfo.url) {
        updateTabCache(tab);
    }
});

// 监听标签页创建事件
chrome.tabs.onCreated.addListener((tab) => {
    updateTabCache(tab);
});

// 存储关闭的标签页并清除缓存
chrome.tabs.onRemoved.addListener(async (tabId, removeInfo) => {
    if (removeInfo.isWindowClosing) return;

    const cachedTab = await getTabFromCache(tabId);
    if (!cachedTab || !cachedTab.url || cachedTab.url === 'chrome://newtab/') {
        await removeTabFromCache(tabId);
        return;
    }

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
        
        // 清除已关闭标签页的缓存
        await removeTabFromCache(tabId);
    } catch (error) {
        console.error('Error handling closed tab:', error);
    }
});

// 初始化设置
chrome.runtime.onInstalled.addListener(async () => {
    await initializeMaxRecent();
    await cacheAllTabs();
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

// 在扩展启动时缓存所有标签页并清理过期缓存
chrome.runtime.onStartup.addListener(async () => {
    await cleanupTabsCache();
    await cacheAllTabs();
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