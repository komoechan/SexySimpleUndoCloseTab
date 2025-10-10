// Background script for handling closed tabs and context menu
let maxRecentItems = 20000; // 改为更大的默认值

// 使用更短的徽章文本格式化函数
function formatBadgeText(count) {
    if (count > 999) return `${Math.floor(count/1000)}k`;
    return count.toString();
}

// 更新图标计数器
async function updateBadgeCount() {
    // Get both normal and incognito closed tabs from local storage and showTabCount from sync storage
    const [{ closedTabs = [], incognitoClosedTabs = [] }, { showTabCount = true }] = await Promise.all([
        chrome.storage.local.get(['closedTabs', 'incognitoClosedTabs']),
        chrome.storage.sync.get(['showTabCount'])
    ]);
    const totalCount = closedTabs.length + incognitoClosedTabs.length;
    const badgeText = showTabCount ? formatBadgeText(totalCount) : '';
    await chrome.action.setBadgeText({ text: badgeText });
    await chrome.action.setBadgeBackgroundColor({ color: '#6a1b9a' });
    await chrome.action.setBadgeTextColor({ color: '#ffffff' });
}

// 初始化时获取最大记录数设置
async function initializeMaxRecent() {
    try {
        const { maxRecent = 20000 } = await chrome.storage.sync.get(['maxRecent']);
        maxRecentItems = Math.max(1, Math.min(20000, maxRecent)); // 确保值在有效范围内
        console.log('Initialized maxRecentItems to:', maxRecentItems); // 添加日志以便调试
    } catch (error) {
        console.error('Error initializing maxRecent:', error);
        maxRecentItems = 20000; // 出错时使用更大的默认值
    }
}

// 更新标签页缓存
async function updateTabCache(tab) {
    if (tab && tab.id && tab.url && !tab.url.startsWith('chrome://')) {
        try {
            // 获取窗口信息以确定是否为无痕窗口
            const window = await chrome.windows.get(tab.windowId);
            const { tabsCache = {} } = await chrome.storage.local.get(['tabsCache']);
            tabsCache[tab.id] = {
                url: tab.url,
                title: tab.title || tab.url,
                favIconUrl: tab.favIconUrl,
                windowId: tab.windowId,
                isIncognito: window.incognito,
                lastUpdated: Date.now()
            };
            await chrome.storage.local.set({ tabsCache });
        } catch (error) {
            console.error('Error updating tab cache:', error);
        }
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
        const windows = await chrome.windows.getAll();
        const windowsMap = new Map(windows.map(w => [w.id, w.incognito]));
        const tabsCache = {};
        
        for (const tab of tabs) {
            if (tab && tab.id && tab.url && !tab.url.startsWith('chrome://')) {
                const isIncognito = windowsMap.get(tab.windowId) || false;
                tabsCache[tab.id] = {
                    url: tab.url,
                    title: tab.title || tab.url,
                    favIconUrl: tab.favIconUrl,
                    windowId: tab.windowId,
                    isIncognito: isIncognito,
                    lastUpdated: Date.now()
                };
            }
        }
        
        await chrome.storage.local.set({ tabsCache });
        console.log('Successfully cached all tabs with window types');
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
        // 确保在使用前重新获取最新的 maxRecent 设置
        const { maxRecent = 20000 } = await chrome.storage.sync.get(['maxRecent']);
        maxRecentItems = Math.max(1, Math.min(20000, maxRecent));
        
        // 获取标签页所在窗口信息以确定是否为无痕窗口
        let isIncognito = false;
        try {
            // 尝试获取窗口信息（如果窗口还存在）
            if (cachedTab.windowId) {
                const window = await chrome.windows.get(cachedTab.windowId);
                isIncognito = window.incognito;
            }
        } catch (error) {
            // 如果无法获取窗口信息，检查缓存中的窗口类型
            isIncognito = cachedTab.isIncognito || false;
        }
        
        // 获取分类存储的标签页数据
        const { 
            closedTabs = [], 
            incognitoClosedTabs = [] 
        } = await chrome.storage.local.get(['closedTabs', 'incognitoClosedTabs']);
        
        const targetArray = isIncognito ? incognitoClosedTabs : closedTabs;
        const storageKey = isIncognito ? 'incognitoClosedTabs' : 'closedTabs';
        
        // 检查是否已经存在相同的 URL
        const existingIndex = targetArray.findIndex(tab => tab.url === cachedTab.url);
        if (existingIndex !== -1) {
            targetArray.splice(existingIndex, 1);
        }

        targetArray.unshift({
            id: Date.now(),
            url: cachedTab.url,
            title: cachedTab.title || cachedTab.url,
            favicon: cachedTab.favIconUrl || '',
            closedAt: Date.now(),
            isIncognito: isIncognito
        });

        console.log('Current maxRecentItems:', maxRecentItems);
        console.log(`${isIncognito ? 'Incognito' : 'Normal'} tabs length before trim:`, targetArray.length);

        // 确保不会意外截断
        if (targetArray.length > maxRecentItems) {
            targetArray.length = maxRecentItems;
        }

        console.log(`${isIncognito ? 'Incognito' : 'Normal'} tabs length after trim:`, targetArray.length);

        // 保存到对应的存储位置
        const updateData = {};
        updateData[storageKey] = targetArray;
        await chrome.storage.local.set(updateData);
        
        await updateBadgeCount();
        
        // 清除已关闭标签页的缓存
        await removeTabFromCache(tabId);
    } catch (error) {
        console.error('Error handling closed tab:', error);
    }
});

// 数据迁移函数 - 将旧版本的数据迁移到新的分类存储结构
async function migrateHistoricalData() {
    try {
        // 检查是否已经迁移过
        const { dataMigrated, extensionVersion } = await chrome.storage.sync.get(['dataMigrated', 'extensionVersion']);
        const currentVersion = '2.0.0';
        
        if (dataMigrated && extensionVersion === currentVersion) {
            console.log('Data migration already completed for version', currentVersion);
            return;
        }

        console.log('Starting data migration...');
        
        // 获取现有数据
        const { closedTabs = [], incognitoClosedTabs = [] } = await chrome.storage.local.get(['closedTabs', 'incognitoClosedTabs']);
        
        // 如果已经有分类数据，说明是新版本，不需要迁移
        if (incognitoClosedTabs.length > 0) {
            console.log('Categorized data already exists, skipping migration');
            await chrome.storage.sync.set({ 
                dataMigrated: true, 
                extensionVersion: currentVersion 
            });
            return;
        }
        
        // 检查是否有需要迁移的旧数据
        if (closedTabs.length > 0) {
            console.log(`Found ${closedTabs.length} historical tabs to migrate`);
            
            // 将所有历史数据标记为普通浏览标签页
            const migratedTabs = closedTabs.map(tab => ({
                ...tab,
                isIncognito: false, // 明确标记为普通浏览
                migrated: true,     // 添加迁移标记
                migratedAt: Date.now() // 记录迁移时间
            }));
            
            // 保存迁移后的数据
            await chrome.storage.local.set({
                closedTabs: migratedTabs,
                incognitoClosedTabs: [] // 确保无痕标签页数组存在
            });
            
            console.log(`Successfully migrated ${migratedTabs.length} tabs as normal browsing tabs`);
        } else {
            console.log('No historical data found, initializing empty arrays');
            
            // 初始化空数组
            await chrome.storage.local.set({
                closedTabs: [],
                incognitoClosedTabs: []
            });
        }
        
        // 标记迁移完成
        await chrome.storage.sync.set({ 
            dataMigrated: true, 
            extensionVersion: currentVersion 
        });
        
        console.log('Data migration completed successfully');
        
    } catch (error) {
        console.error('Error during data migration:', error);
        // 即使迁移失败，也要确保基本结构存在
        await chrome.storage.local.set({
            closedTabs: [],
            incognitoClosedTabs: []
        });
    }
}

// 初始化设置
chrome.runtime.onInstalled.addListener(async () => {
    // 首先执行数据迁移
    await migrateHistoricalData();
    
    await initializeMaxRecent();
    await cacheAllTabs();
    await updateBadgeCount();

    // 设置初始主题和语言，保持默认值不变
    const currentSettings = await chrome.storage.sync.get(['theme', 'maxRecent', 'width', 'language', 'showTabCount', 'clearMode']);
    await chrome.storage.sync.set({ 
        theme: currentSettings.theme || 'light', 
        maxRecent: currentSettings.maxRecent || 20000, 
        width: currentSettings.width || 400,
        language: currentSettings.language || 'en',
        showTabCount: currentSettings.showTabCount !== undefined ? currentSettings.showTabCount : true,
        clearMode: currentSettings.clearMode || 'none' // 添加默认清理模式
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

// 清空所有记录的标签页
async function clearAllClosedTabs() {
    try {
        await chrome.storage.local.set({ 
            closedTabs: [], 
            incognitoClosedTabs: [] 
        });
        await updateBadgeCount();
        console.log('All closed tabs cleared automatically');
    } catch (error) {
        console.error('Error clearing all closed tabs:', error);
    }
}

// 仅清空无痕标签页记录
async function clearIncognitoClosedTabs() {
    try {
        await chrome.storage.local.set({ incognitoClosedTabs: [] });
        await updateBadgeCount();
        console.log('Incognito closed tabs cleared automatically');
    } catch (error) {
        console.error('Error clearing incognito closed tabs:', error);
    }
}

// 检查是否应该自动清空记录
async function checkAndClearIfNeeded(triggerType = 'unknown') {
    try {
        const { clearMode = 'none' } = await chrome.storage.sync.get(['clearMode']);
        
        console.log(`Auto clear check triggered by: ${triggerType}, mode: ${clearMode}`);
        
        switch (clearMode) {
            case 'incognito':
                await clearIncognitoClosedTabs();
                break;
            case 'all':
                await clearAllClosedTabs();
                break;
            case 'none':
            default:
                console.log('Auto clear disabled');
                break;
        }
    } catch (error) {
        console.error('Error checking auto clear setting:', error);
    }
}

// 存储窗口信息以便在关闭时识别类型
let windowsInfo = new Map();

// 监听窗口创建事件
chrome.windows.onCreated.addListener(async (window) => {
    windowsInfo.set(window.id, {
        incognito: window.incognito,
        createdAt: Date.now()
    });
});

// 监听窗口关闭事件
chrome.windows.onRemoved.addListener(async (windowId) => {
    try {
        // 获取关闭窗口的信息
        const closedWindowInfo = windowsInfo.get(windowId);
        const wasIncognito = closedWindowInfo ? closedWindowInfo.incognito : false;
        
        // 清理窗口信息
        windowsInfo.delete(windowId);
        
        // 检查是否还有其他窗口打开
        const remainingWindows = await chrome.windows.getAll();
        
        // 如果没有其他窗口，说明浏览器即将关闭
        if (remainingWindows.length === 0) {
            await checkAndClearIfNeeded('browser-exit');
        } else if (wasIncognito) {
            // 如果关闭的是无痕窗口，根据设置决定是否清理
            const { clearMode = 'none' } = await chrome.storage.sync.get(['clearMode']);
            if (clearMode === 'incognito' || clearMode === 'all') {
                await checkAndClearIfNeeded('incognito-window-closed');
            }
        }
    } catch (error) {
        console.error('Error handling window removal:', error);
    }
});

// 监听浏览器退出事件
chrome.runtime.onSuspend.addListener(async () => {
    await checkAndClearIfNeeded('browser-suspend');
});

// 监听设置变化
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && changes.maxRecent) {
        const newValue = changes.maxRecent.newValue;
        maxRecentItems = Math.max(1, Math.min(20000, newValue)); // 确保值在有效范围内
    }
    if (namespace === 'sync' && changes.showTabCount) {
        updateBadgeCount();
    }
});

// 监听来自popup的消息，提供分页数据
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'getClosedTabs') {
        (async () => {
            try {
                const { closedTabs = [], incognitoClosedTabs = [] } = await chrome.storage.local.get(['closedTabs', 'incognitoClosedTabs']);
                const { page = 1, pageSize = 20, query = '', includeIncognito = true } = message; // 接收查询参数

                let tabs = closedTabs;
                let incognitoTabs = incognitoClosedTabs;
                
                // 根据请求决定是否包含无痕标签页
                if (includeIncognito) {
                    // 合并标签页，并标记来源
                    tabs = [
                        ...tabs.map(tab => ({ ...tab, source: 'regular' })),
                        ...incognitoTabs.map(tab => ({ ...tab, source: 'incognito' }))
                    ];
                    // 按关闭时间排序（最新的在前）
                    tabs.sort((a, b) => b.closedAt - a.closedAt);
                }

                let filteredTabs = tabs;
                if (query) {
                    const lowerQuery = query.toLowerCase();
                    filteredTabs = tabs.filter(tab =>
                        (tab.title && tab.title.toLowerCase().includes(lowerQuery)) ||
                        (tab.url && tab.url.toLowerCase().includes(lowerQuery))
                    );
                }

                const start = (page - 1) * pageSize;
                const end = start + pageSize;
                const pageItems = filteredTabs.slice(start, end);

                sendResponse({
                    tabs: pageItems,
                    totalCount: filteredTabs.length,
                    currentPage: page,
                    totalPages: Math.ceil(filteredTabs.length / pageSize),
                    regularCount: closedTabs.length,
                    incognitoCount: incognitoClosedTabs.length
                });
            } catch (error) {
                console.error('Error fetching closed tabs in background:', error);
                sendResponse({ tabs: [], totalCount: 0, error: error.message });
            }
        })();
        return true; // Indicates that the response is sent asynchronously
    }
    
    if (message.type === 'updateBadge') {
        (async () => {
            try {
                await updateBadgeCount();
                sendResponse({ success: true });
            } catch (error) {
                console.error('Error updating badge:', error);
                sendResponse({ success: false, error: error.message });
            }
        })();
        return true; // Indicates that the response is sent asynchronously
    }
    
// 可以添加其他消息类型处理，例如 favicon
});

// 监听快捷键命令：前台打开最近一个关闭的标签页
chrome.commands.onCommand.addListener(async (command) => {
    if (command !== 'open-most-recently-closed-tab') return;

    try {
        const [{ closedTabs = [], incognitoClosedTabs = [] }, lastFocusedWindow] = await Promise.all([
            chrome.storage.local.get(['closedTabs', 'incognitoClosedTabs']),
            chrome.windows.getLastFocused({ populate: false }).catch(() => null)
        ]);

        const useIncognito = !!(lastFocusedWindow && lastFocusedWindow.incognito);
        let candidate = null;

        if (useIncognito && incognitoClosedTabs.length > 0) {
            candidate = incognitoClosedTabs[0];
        } else if (closedTabs.length > 0) {
            candidate = closedTabs[0];
        } else if (incognitoClosedTabs.length > 0) {
            candidate = incognitoClosedTabs[0];
        }

        if (!candidate || !candidate.url) {
            console.log('No recently closed tab to open');
            return;
        }

        const createProps = { url: candidate.url, active: true };
        if (lastFocusedWindow && typeof lastFocusedWindow.id === 'number') {
            createProps.windowId = lastFocusedWindow.id;
        }

        await chrome.tabs.create(createProps);
    } catch (error) {
        console.error('Error handling open-most-recently-closed-tab command:', error);
    }
});

// 导出一些工具函数供其他模块使用
export { updateBadgeCount };