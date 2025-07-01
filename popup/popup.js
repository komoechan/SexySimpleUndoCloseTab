// 语言文本配置
const languageTexts = {
    zh: {
        recentTabs: '最近关闭',
        history: '历史记录',
        searchPlaceholder: '搜索...',
        prevPage: '上一页',
        nextPage: '下一页'
    },
    en: {
        recentTabs: 'Recently Closed',
        history: 'History',
        searchPlaceholder: 'Search...',
        prevPage: 'Previous Page',
        nextPage: 'Next Page'
    },
    ja: {
        recentTabs: '最近閉じたタブ',
        history: '履歴',
        searchPlaceholder: '検索...',
        prevPage: '前のページ',
        nextPage: '次のページ'
    },
    ko: {
        recentTabs: '최근 닫은 탭',
        history: '방문 기록',
        searchPlaceholder: '검색...',
        prevPage: '이전 페이지',
        nextPage: '다음 페이지'
    },
    fr: {
        recentTabs: 'Récemment Fermés',
        history: 'Historique',
        searchPlaceholder: 'Rechercher...',
        prevPage: 'Page Précédente',
        nextPage: 'Page Suivante'
    },
    de: {
        recentTabs: 'Kürzlich Geschlossen',
        history: 'Verlauf',
        searchPlaceholder: 'Suchen...',
        prevPage: 'Vorherige Seite',
        nextPage: 'Nächste Seite'
    },
    es: {
        recentTabs: 'Cerradas Recientemente',
        history: 'Historial',
        searchPlaceholder: 'Buscar...',
        prevPage: 'Página Anterior',
        nextPage: 'Página Siguiente'
    }
};

// 全局配置缓存
let globalConfig = {};

// DOM 元素缓存
let domCache = {};

// 初始化 DOM 缓存
function initDOMCache() {
    domCache = {
        globalSearch: document.getElementById('globalSearch'),
        historyList: document.getElementById('historyList'),
        closedTabsList: document.getElementById('closedTabsList'),
        globalPrevPage: document.getElementById('globalPrevPage'),
        globalNextPage: document.getElementById('globalNextPage'),
        globalPageInfo: document.getElementById('globalPageInfo'),
        container: document.querySelector('.container'),
        closedTabsButton: document.querySelector('.tab-button[data-tab="closed-tabs"]'),
        historyButton: document.querySelector('.tab-button[data-tab="history"]'),
        tabButtons: document.querySelectorAll('.tab-button')
    };
}

async function updateUI(config = globalConfig) {
    const texts = languageTexts[config.language] || languageTexts.en;
    
    // 使用缓存的 DOM 元素，避免重复查询
    if (domCache.globalPrevPage) {
        domCache.globalPrevPage.title = texts.prevPage;
    }
    if (domCache.globalNextPage) {
        domCache.globalNextPage.title = texts.nextPage;
    }
    if (domCache.closedTabsButton) {
        domCache.closedTabsButton.textContent = texts.recentTabs;
    }
    if (domCache.historyButton) {
        domCache.historyButton.textContent = texts.history;
    }
    if (domCache.globalSearch) {
        domCache.globalSearch.placeholder = texts.searchPlaceholder;
    }
}

let currentPage = 1;
let currentHistoryItems = [];
let currentClosedTabs = [];
let tabButtons; // 添加全局变量
const itemsPerPage = 20;
let isInfiniteScrollMode = false; // 添加一个标志来追踪当前是否为瀑布流模式

document.addEventListener('DOMContentLoaded', async () => {
    // 1. 立即初始化 DOM 缓存和基本 UI
    initDOMCache();
    
    // 2. 异步加载配置，不阻塞基本 UI 显示
    const configPromise = chrome.storage.sync.get({
        language: 'en',
        theme: 'system',
        popupWidth: 500,
        navigationPosition: 'top',
        pageMode: 'pagination'
    });

    // 3. 先设置基本的交互能力
    domCache.globalSearch.focus();
    tabButtons = domCache.tabButtons; // 给全局变量赋值

    // 4. 等待配置加载完成
    globalConfig = await configPromise;
    
    // 5. 应用配置到 UI
    applyTheme(globalConfig.theme);

    // 6. 设置核心事件监听器（延迟非关键事件监听器）
    setupCoreEventListeners();

    // 7. 延迟设置优化相关的事件监听器
    requestAnimationFrame(() => {
        setupOptimizationEventListeners();
    });

    // 8. 初始化搜索框 placeholder 和加载数据
    const texts = languageTexts[globalConfig.language];
    domCache.globalSearch.placeholder = texts.searchPlaceholder;

    // 9. 延迟加载：默认只加载最近关闭的标签页数据，历史记录等用户切换时再加载
    const activeTab = document.querySelector('.tab-button.active').dataset.tab;
    if (activeTab === 'closed-tabs') {
        // 延迟一帧来避免阻塞初始渲染
        requestAnimationFrame(() => {
            loadClosedTabs();
        });
    }
    // 如果默认标签是历史记录，则加载历史记录
    else if (activeTab === 'history') {
        requestAnimationFrame(() => {
            loadHistoryItems();
        });
    }

    // 10. 应用配置到页面元素
    document.documentElement.style.setProperty('--popup-width', `${globalConfig.popupWidth}px`);

    // 根据导航位置设置模块位置
    if (globalConfig.navigationPosition === 'bottom') {
        domCache.container.classList.add('bottom-navigation');
    } else {
        domCache.container.classList.remove('bottom-navigation');
    }

    // 11. 设置语言文本和初始化UI
    updateLanguageTexts(globalConfig.language);
    await updateUI(globalConfig);

    // 12. 延迟加载数据（避免阻塞界面显示）
    requestAnimationFrame(() => {
        initializeDataLoading();
    });

    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', async (e) => {
        if (globalConfig.theme === 'system') {
            applyTheme('system');
        }
    });

    // 监听配置变化
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'sync') {
            if (changes.theme) {
                globalConfig.theme = changes.theme.newValue;
                applyTheme(globalConfig.theme);
            }
            if (changes.popupWidth) {
                globalConfig.popupWidth = changes.popupWidth.newValue;
                document.documentElement.style.setProperty('--popup-width', `${globalConfig.popupWidth}px`);
            }
            if (changes.language) {
                globalConfig.language = changes.language.newValue;
                updateLanguageTexts(globalConfig.language);
                updateUI(globalConfig);
            }
            if (changes.navigationPosition) {
                globalConfig.navigationPosition = changes.navigationPosition.newValue;
                // 应用导航位置变化
                const container = document.querySelector('.container');
                if (globalConfig.navigationPosition === 'bottom') {
                    container.classList.add('bottom-navigation');
                } else {
                    container.classList.remove('bottom-navigation');
                }
            }
            if (changes.pageMode) {
                globalConfig.pageMode = changes.pageMode.newValue;
                // 重新应用页面模式设置
                location.reload(); // 简单重载以应用新的页面模式
            }
        }
    });

    // 13. 设置页面模式和无限滚动监听器（如果需要）

    if (globalConfig.pageMode === 'infinite') {
        domCache.globalPrevPage.style.display = 'none';
        domCache.globalNextPage.style.display = 'none';
        isInfiniteScrollMode = true;
        
        // 为每个列表容器添加滚动事件监听器，以便在接近底部时加载更多内容
        
        // 添加滚动监听器函数
        const addScrollListener = (element) => {
            let scrollTimeout = null;
            
            // 检查是否需要加载更多内容
            const checkLoadMore = () => {
                // 更宽松的触发条件，将0.2改为0.3
                if (element.scrollHeight - element.scrollTop - element.clientHeight < element.clientHeight * 0.3) {
                    if (!element.dataset.isLoading || element.dataset.isLoading === 'false') {
                        loadMoreItems(element);
                    }
                }
            };
            
            // 封装加载更多逻辑
            const loadMoreItems = (elem) => {
                elem.dataset.isLoading = 'true';
                
                setTimeout(() => {
                    currentPage++;
                    if (elem.id === 'historyList' && 
                        document.querySelector('.tab-button.active').dataset.tab === 'history') {
                        loadHistoryItems(true); // 传入true表示追加加载
                    } else if (elem.id === 'closedTabsList' && 
                               document.querySelector('.tab-button.active').dataset.tab === 'closed-tabs') {
                        loadClosedTabs(true); // 传入true表示追加加载
                    }
                    // 重置加载状态
                    setTimeout(() => {
                        elem.dataset.isLoading = 'false';
                    }, 300); // 减少重置时间
                }, 100); // 减少延迟时间
            };
            
            // 滚动事件
            element.addEventListener('scroll', () => {
                checkLoadMore();
                
                // 清除之前的定时器
                if (scrollTimeout) {
                    clearTimeout(scrollTimeout);
                }
                
                // 设置新的定时器，滚动停止后再次检查
                scrollTimeout = setTimeout(() => {
                    checkLoadMore();
                }, 150);
            }, { passive: true });
            
            // 添加窗口大小改变事件监听器，以防止在调整窗口大小时未能触发加载
            window.addEventListener('resize', () => {
                checkLoadMore();
            }, { passive: true });
        };
        
        // 为两个列表都添加滚动监听器
        addScrollListener(domCache.historyList);
        addScrollListener(domCache.closedTabsList);
    } else {
        isInfiniteScrollMode = false;
        domCache.globalPrevPage.style.display = 'block';
        domCache.globalNextPage.style.display = 'block';
    }
});

function updateTabCounts(totalCountForTab, tabDataType) {
    const query = domCache.globalSearch.value.trim();
    tabButtons.forEach(button => {
        const countSpan = button.querySelector('.count');
        if (countSpan) {
            countSpan.remove();
        }

        let count = 0;
        const dataType = button.dataset.tab;

        if (query) { // 只有在搜索时才显示计数
            if (tabDataType && dataType === tabDataType) {
                count = totalCountForTab;
            } else if (dataType === 'history') {
                // 当更新 closed-tabs 的计数时，history 的计数需要保持 (如果已计算)
                // 这里 currentHistoryItems 可能不是最新的，如果依赖 background.js, 需要相应调整
                // 暂时维持现有逻辑，后续统一到 background.js 获取所有计数
                count = currentHistoryItems.length; 
            } else if (dataType === 'closed-tabs') {
                // 当更新 history 的计数时，closed-tabs 的计数需要保持
                // count = currentClosedTabs.length; // currentClosedTabs 现在只是一页数据，不能这样用
                // 这个也需要 background.js 返回总数
                // 暂时注释掉，依赖于调用时传入的 totalCountForTab
            }

            if (count > 0) {
                const newCountSpan = document.createElement('span');
                newCountSpan.className = 'count';
                newCountSpan.textContent = formatCount(count);
                button.appendChild(newCountSpan);
            }
        }
    });
}

const formatCount = (count) => count > 99 ? '99+' : count;

// 事件处理函数
function handleSearchInput() {
    // 搜索时总是重置页码和列表内容
    currentPage = 1;
    const activeTab = document.querySelector('.tab-button.active').dataset.tab;
    
    // 清空搜索框时移除计数显示
    if (!domCache.globalSearch.value.trim()) {
        document.querySelectorAll('.tab-button .count').forEach(el => el.remove());
    }
    
    if (activeTab === 'history') {
        loadHistoryItems(false); // 搜索时始终使用false强制刷新
        // 只在有搜索内容时预加载另一个标签的数据
        if (domCache.globalSearch.value.trim()) {
            chrome.storage.local.get(['closedTabs'], (result) => {
                const query = domCache.globalSearch.value.toLowerCase();
                currentClosedTabs = result.closedTabs || [];
                currentClosedTabs = currentClosedTabs.filter(tab => 
                    tab.title.toLowerCase().includes(query) || 
                    tab.url.toLowerCase().includes(query)
                );
                updateTabCounts();
            });
        }
    } else {
        loadClosedTabs(false); // 搜索时始终使用false强制刷新
        // 只在有搜索内容时预加载 history 数据
        if (domCache.globalSearch.value.trim()) {
            loadHistoryItemsForSearch(domCache.globalSearch.value.trim());
        }
    }
}

function handlePrevPage() {
    if (currentPage > 1) {
        currentPage--;
        if (document.querySelector('.tab-button.active').dataset.tab === 'history') {
            loadHistoryItems();
        } else {
            loadClosedTabs();
        }
    }
}

function handleNextPage() {
    currentPage++;
    if (document.querySelector('.tab-button.active').dataset.tab === 'history') {
        loadHistoryItems();
    } else {
        loadClosedTabs();
    }
}

async function handleTabClick(event) {
    const button = event.currentTarget;
    document.querySelector('.tab-button.active').classList.remove('active');
    button.classList.add('active');
    
    // 切换标签时重置页码
    currentPage = 1;
    
    document.querySelector('.tab-content.active').classList.remove('active');
    document.getElementById(`${button.dataset.tab}-content`).classList.add('active');
    
    // 切换时重置任何加载指示器
    document.querySelectorAll('.loading-indicator').forEach(indicator => {
        indicator.remove();
    });
    
    if (button.dataset.tab === 'history') {
        // 延迟加载：只在切换到历史记录标签时才加载数据
        loadHistoryItems(false);
        // 只在有搜索内容时预加载 closed tabs 数据
        if (domCache.globalSearch.value.trim()) {
            chrome.storage.local.get(['closedTabs'], (result) => {
                const query = domCache.globalSearch.value.toLowerCase();
                currentClosedTabs = result.closedTabs || [];
                if (query) {
                    currentClosedTabs = currentClosedTabs.filter(tab => 
                        tab.title.toLowerCase().includes(query) || 
                        tab.url.toLowerCase().includes(query)
                    );
                }
                updateTabCounts();
            });
        }
    } else {
        loadClosedTabs(false); // 始终使用false确保切换标签时清空内容
        // 只在有搜索内容时预加载 history 数据
        if (domCache.globalSearch.value.trim()) {
            loadHistoryItemsForSearch(domCache.globalSearch.value.trim());
        }
    }

    const texts = languageTexts[globalConfig.language];
    domCache.globalSearch.placeholder = texts.searchPlaceholder;
}

function handleOutsideClick(e) {
    // 仅在左键点击时关闭窗口
    if (e.button === 0 && !e.target.closest('.container')) {
        window.close();
    }
}

// 初始化数据加载
function initializeDataLoading() {
    const activeTab = document.querySelector('.tab-button.active').dataset.tab;
    if (activeTab === 'closed-tabs') {
        loadClosedTabs();
    } else if (activeTab === 'history') {
        loadHistoryItems();
    }
}

// 设置核心事件监听器（用户交互相关）
function setupCoreEventListeners() {
    // 搜索输入事件
    domCache.globalSearch.addEventListener('input', handleSearchInput);
    
    // 分页按钮事件
    domCache.globalPrevPage.addEventListener('click', handlePrevPage);
    domCache.globalNextPage.addEventListener('click', handleNextPage);
    
    // 标签切换事件
    domCache.tabButtons.forEach(button => {
        button.addEventListener('click', handleTabClick);
    });
    
    // 关闭窗口事件
    document.addEventListener('click', handleOutsideClick);
}

// 设置优化相关的事件监听器（性能优化相关）
function setupOptimizationEventListeners() {
    // 优化 macOS 触摸板滚动
    let lastTouchTime = 0;
    domCache.historyList.addEventListener('touchstart', () => {
        lastTouchTime = Date.now();
    }, { passive: true });

    domCache.historyList.addEventListener('scroll', () => {
        // 只有非触摸滚动时才应用 pointerEvents 修复
        if (Date.now() - lastTouchTime > 300) {
            domCache.historyList.style.pointerEvents = 'none';
            requestAnimationFrame(() => {
                domCache.historyList.style.pointerEvents = 'auto';
            });
        }
    }, { passive: true });

    // 优化滚轮事件处理
    domCache.historyList.addEventListener('wheel', (e) => {
        const isAtTop = domCache.historyList.scrollTop === 0;
        const isAtBottom = domCache.historyList.scrollHeight - domCache.historyList.scrollTop === domCache.historyList.clientHeight;

        // 只在到达边界时阻止默认行为
        if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
            e.preventDefault();
        }
    }, { passive: false });
}

// 专门用于搜索时预加载历史数据的函数
function loadHistoryItemsForSearch(query) {
    // 搜索时使用全量数据，确保用户能找到所有相关的历史记录
    chrome.history.search({
        text: '',  // 始终用空字符串获取所有历史记录
        startTime: 0,
        maxResults: 2147483647  // 搜索时使用全量数据
    }, (historyItems) => {
        if (query) {
            const queryLower = query.toLowerCase();
            currentHistoryItems = historyItems.filter(item => 
                (item.title && item.title.toLowerCase().includes(queryLower)) || 
                item.url.toLowerCase().includes(queryLower)
            );
        } else {
            currentHistoryItems = historyItems;
        }
        updateTabCounts(currentHistoryItems.length, 'history');
    });
}

function loadHistoryItems(append = false) {
    const query = domCache.globalSearch.value;
    const startTime = 0;
    
    // 确保是当前活动标签才更新UI
    if (document.querySelector('.tab-button.active').dataset.tab !== 'history') {
        return;
    }
    
    // 优化：根据是否有搜索查询来决定 maxResults
    // 有搜索查询时使用全量搜索，无查询时限制数量以提升性能
    const maxResults = query ? 
        2147483647 : // 搜索时使用全量数据
        (isInfiniteScrollMode ? 
            Math.min(currentPage * itemsPerPage * 2, 10000) : // 无限滚动时适当增加缓冲
            Math.min(currentPage * itemsPerPage * 5, 5000));   // 分页模式下预加载更多页面
    
    chrome.history.search({
        text: '',  // 始终用空字符串获取所有历史记录，保持原有搜索逻辑
        startTime: startTime,
        maxResults: maxResults
    }, (historyItems) => {
        // 在客户端进行过滤，保证搜索结果的一致性
        if (query) {
            const queryLower = query.toLowerCase();
            currentHistoryItems = historyItems.filter(item => 
                (item.title && item.title.toLowerCase().includes(queryLower)) || 
                item.url.toLowerCase().includes(queryLower)
            );
        } else {
            currentHistoryItems = historyItems;
        }
        
        // 在瀑布流模式下，仅首次加载或搜索时清空列表
        if (!isInfiniteScrollMode || !append) {
            displayHistoryItems();
        } else {
            // 在瀑布流模式下追加显示项目
            appendHistoryItems();
        }
        
        updateGlobalPagination(currentHistoryItems.length);
        updateTabCounts(currentHistoryItems.length, 'history');
    });
}

// 修改加载指示器创建逻辑，给每个创建加载指示器的地方添加点击事件
function createLoadingIndicator() {
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.id = 'loadingIndicator';
    loadingIndicator.textContent = '加载更多...';
    loadingIndicator.style.textAlign = 'center';
    loadingIndicator.style.padding = '10px';
    loadingIndicator.style.color = 'var(--text-color)';
    loadingIndicator.style.opacity = '0.7';
    loadingIndicator.style.cursor = 'pointer'; // 添加手型光标
    
    // 添加点击事件，手动触发加载
    loadingIndicator.addEventListener('click', () => {
        const parentElement = loadingIndicator.parentElement;
        if (parentElement && (!parentElement.dataset.isLoading || parentElement.dataset.isLoading === 'false')) {
            parentElement.dataset.isLoading = 'true';
            currentPage++;
            
            if (parentElement.id === 'historyList') {
                loadHistoryItems(true);
            } else if (parentElement.id === 'closedTabsList') {
                loadClosedTabs(true);
            }
            
            setTimeout(() => {
                parentElement.dataset.isLoading = 'false';
            }, 300);
        }
    });
    
    return loadingIndicator;
}

// 修改appendHistoryItems函数，使用新的createLoadingIndicator函数
function appendHistoryItems() {
    const historyList = domCache.historyList;
    
    // 计算当前页的起始和结束索引
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = currentHistoryItems.slice(start, end);
    
    // 如果没有更多项目可加载，则不执行任何操作
    if (pageItems.length === 0) {
        return;
    }
    
    // 移除任何现有的加载指示器
    const existingIndicator = historyList.querySelector('#loadingIndicator');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    // 追加新项目
    pageItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        
        const favicon = document.createElement('img');
        favicon.className = 'favicon';
        favicon.src = faviconURL(item.url);
        favicon.onerror = () => {
            favicon.src = faviconURL('about:blank');
        };

        const linkContainer = document.createElement('div');
        linkContainer.className = 'link-container';

        const link = document.createElement('span');
        link.className = 'history-link';
        link.textContent = item.title || item.url;

        const time = document.createElement('span');
        time.className = 'visit-time';
        time.textContent = getRelativeTimeString(item.lastVisitTime);

        const deleteButton = document.createElement('span');
        deleteButton.className = 'delete-button';
        deleteButton.innerHTML = '×';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            chrome.history.deleteUrl({ url: item.url }, () => {
                loadHistoryItems();
            });
        });

        div.appendChild(favicon);
        linkContainer.appendChild(link);
        linkContainer.appendChild(time);
        div.appendChild(linkContainer);
        div.appendChild(deleteButton);
        historyList.appendChild(div);

        let isMouseMove = false;
        
        link.addEventListener('mousedown', (e) => {
            isMouseMove = false;
            if (e.button === 1) {
                e.preventDefault();
                e.stopPropagation();
            }
        });

        link.addEventListener('mousemove', () => {
            isMouseMove = true;
        });

        link.addEventListener('mouseup', (e) => {
            if (isMouseMove) return;
            
            if (e.button === 0) {
                e.preventDefault();
                e.stopPropagation();
                chrome.tabs.create({ url: item.url, active: true });
                window.close();
            } else if (e.button === 1) {
                e.preventDefault();
                e.stopPropagation();
                chrome.tabs.create({ url: item.url, active: false });
            }
        });

        link.addEventListener('wheel', (e) => {
            e.stopPropagation();
        }, { passive: true });

        div.addEventListener('mousedown', (e) => {
            if (e.button === 1) {
                e.preventDefault();
                e.stopPropagation();
            }
        });

        div.addEventListener('mouseup', (e => {
            if (e.button === 1) {
                e.preventDefault();
                e.stopPropagation();
                chrome.tabs.create({ url: item.url, active: false });
            }
        }));

        div.addEventListener('click', (e) => {
            if (!e.target.classList.contains('delete-button') && !e.target.classList.contains('history-link')) {
                chrome.tabs.create({ url: item.url, active: true });
                window.close();
            }
        });

        time.style.userSelect = 'none';
    });
    
    // 如果还有更多项目可加载，添加加载指示器
    if (currentPage * itemsPerPage < currentHistoryItems.length) {
        historyList.appendChild(createLoadingIndicator());
    }
}

function loadClosedTabs(append = false) {
    const query = domCache.globalSearch.value.toLowerCase();
    
    // 确保是当前活动标签才更新UI
    if (document.querySelector('.tab-button.active').dataset.tab !== 'closed-tabs') {
        return;
    }

    // 显示加载指示器 (如果适用)
    if (!append && !isInfiniteScrollMode) {
        // 非追加模式且非无限滚动时，清空列表并可以显示一个主加载指示
        // closedTabsList.innerHTML = '<div class="loading-indicator">Loading...</div>'; 
        // 实际的加载指示器创建和移除由 displayClosedTabs 和 appendClosedTabs 处理
    } else if (append && isInfiniteScrollMode) {
        // 无限滚动追加时，可以在列表末尾显示加载更多指示
        // let indicator = domCache.closedTabsList.querySelector('#loadingIndicator');
        // if (!indicator) domCache.closedTabsList.appendChild(createLoadingIndicator());
    }

    chrome.runtime.sendMessage(
        { type: 'getClosedTabs', page: currentPage, pageSize: itemsPerPage, query: query }, 
        (response) => {
            if (chrome.runtime.lastError) {
                console.error('Error loading closed tabs:', chrome.runtime.lastError.message);
                // 可以在UI上显示错误信息
                // const existingIndicator = domCache.closedTabsList.querySelector('#loadingIndicator');
                // if (existingIndicator) existingIndicator.remove();
                updateGlobalPagination(0);
                updateTabCounts(0, 'closed-tabs'); // 可能需要根据错误情况更新计数
                return;
            }

            if (!response) {
                console.error('Empty response from background for getClosedTabs');
                updateGlobalPagination(0);
                updateTabCounts(0, 'closed-tabs');
                return;
            }
            
            // currentClosedTabs = response.tabs; // currentClosedTabs现在只代表当前页的项目，这会影响瀑布流的长度判断
                                         // 因此，瀑布流的长度判断需要依赖 totalCount

            if (!isInfiniteScrollMode || !append) {
                // 正常分页加载或瀑布流首次加载
                displayClosedTabs(response.tabs || []);
            } else {
                // 瀑布流模式下追加显示项目
                appendClosedTabs(response.tabs || []);
            }
            
            updateGlobalPagination(response.totalCount);
            // updateTabCounts 应该依赖于 background.js 返回的总数或独立的计数机制
            // 为了保持现有 updateTabCounts 的行为（它依赖 currentClosedTabs 和 currentHistoryItems 的长度），
            // 我们需要在搜索时，让 background.js 也返回未过滤的总数，或者 popup.js 自己维护这个计数。
            // 暂时，我们让 updateTabCounts 在搜索过滤后，基于 background.js 返回的过滤后总数来更新。
            // 为了精确的标签页计数，后续可能需要background.js在getClosedTabs时额外返回未过滤的总数。
            updateTabCounts(response.totalCount, 'closed-tabs'); // 修改 updateTabCounts 以接受特定标签的计数
        }
    );
}

// 修改appendClosedTabs函数，使其接受要追加的项目，并根据总数判断是否继续显示加载指示器
function appendClosedTabs(newItems) {
    const closedTabsList = domCache.closedTabsList;
    
    // 如果没有更多项目可加载，则不执行任何操作
    if (!newItems || newItems.length === 0) {
        // 移除可能存在的加载指示器，因为没有更多项目了
        const existingIndicator = closedTabsList.querySelector('#loadingIndicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }
        return;
    }
    
    // 移除任何现有的加载指示器，因为我们将要添加新项目
    const existingIndicator = closedTabsList.querySelector('#loadingIndicator');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    // 追加新项目 (这部分逻辑与 displayClosedTabs 中的项目创建相同，可以考虑提取成一个公共函数)
    newItems.forEach(tab => {
        const div = document.createElement('div');
        div.className = 'history-item';

        const favicon = document.createElement('img');
        favicon.className = 'favicon';
        
        if (tab.favicon) {
            favicon.src = tab.favicon;
        } else {
            favicon.src = faviconURL(tab.url);
        }
        
        favicon.onerror = () => {
            favicon.src = faviconURL('about:blank');
        };

        const linkContainer = document.createElement('div');
        linkContainer.className = 'link-container';

        const link = document.createElement('span');
        link.className = 'history-link';
        link.textContent = tab.title || tab.url;

        const time = document.createElement('span');
        time.className = 'visit-time';
        time.textContent = getRelativeTimeString(tab.closedAt);

        const deleteButton = document.createElement('span');
        deleteButton.className = 'delete-button';
        deleteButton.innerHTML = '×';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            chrome.storage.local.get(['closedTabs'], (result) => {
                const closedTabs = result.closedTabs || [];
                const updatedClosedTabs = closedTabs.filter(t => t.id !== tab.id);
                chrome.storage.local.set({ closedTabs: updatedClosedTabs }, () => {
                    loadClosedTabs();
                });
            });
        });

        let isMouseMove = false;
        
        link.addEventListener('mousedown', (e) => {
            isMouseMove = false;
            if (e.button === 1) {
                e.preventDefault();
                e.stopPropagation();
            }
        });

        link.addEventListener('mousemove', () => {
            isMouseMove = true;
        });

        link.addEventListener('mouseup', (e) => {
            if (isMouseMove) return;
            
            if (e.button === 0) {
                e.preventDefault();
                e.stopPropagation();
                chrome.tabs.create({ url: tab.url, active: true });
                window.close();
            } else if (e.button === 1) {
                e.preventDefault();
                e.stopPropagation();
                chrome.tabs.create({ url: tab.url, active: false });
            }
        });

        div.appendChild(favicon);
        linkContainer.appendChild(link);
        linkContainer.appendChild(time);
        div.appendChild(linkContainer);
        div.appendChild(deleteButton);
        closedTabsList.appendChild(div);

        div.addEventListener('mousedown', (e) => {
            if (e.button === 1) {
                e.preventDefault();
                e.stopPropagation();
            }
        });

        div.addEventListener('mouseup', (e) => {
            if (e.button === 1) {
                e.preventDefault();
                e.stopPropagation();
                chrome.tabs.create({ url: tab.url, active: false });
            }
        });

        div.addEventListener('click', (e) => {
            // 只有当点击不是发生在link或delete-button上时才处理
            if (!e.target.classList.contains('delete-button') && !e.target.classList.contains('history-link')) {
                chrome.tabs.create({ url: tab.url, active: true });
                window.close();
            }
        });

        // 禁用时间戳的文本选择
        time.style.userSelect = 'none';
    });
    
    // 如果还有更多项目可加载，添加加载指示器
    // 这里的判断条件需要修改，应该基于从 background.js 获取的总数
    // updateGlobalPagination 会处理分页按钮，而无限滚动需要自己判断
    // const totalItems = ???; // 这个需要从 loadClosedTabs 传递过来或者从某个地方获取
    // if (currentPage * itemsPerPage < totalItems) { 
    //    closedTabsList.appendChild(createLoadingIndicator());
    // }
    // 加载指示器的添加逻辑现在由 loadMoreItems (在滚动监听器中) 或 displayClosedTabs/appendClosedTabs 内部管理
    // 对于 appendClosedTabs，它处理完当前批次后，如果还可能有更多（由调用者 loadClosedTabs 处的 updateGlobalPagination 结果判断），
    // 则滚动监听器会在需要时触发下一次加载并添加指示器。
    // 或者，更简单的是，如果 newItems 的数量等于 itemsPerPage，就假设可能还有更多，并添加指示器。
    // 这个判断逻辑放在 addScrollListener 中的 loadMoreItems 更合适
}

function displayClosedTabs(pageItems) {
    const closedTabsList = domCache.closedTabsList;
    closedTabsList.innerHTML = '';
    
    // 只有在非瀑布流模式下才重置滚动位置
    if (!isInfiniteScrollMode) {
        closedTabsList.scrollTop = 0;
    }

    pageItems.forEach(tab => {
        console.log('Displaying closed tab', tab);
        const div = document.createElement('div');
        div.className = 'history-item';

        const favicon = document.createElement('img');
        favicon.className = 'favicon';
        
        if (tab.favicon) {
            favicon.src = tab.favicon;
        } else {
            favicon.src = faviconURL(tab.url);
        }
        
        favicon.onerror = () => {
            favicon.src = faviconURL('about:blank');
        };

        const linkContainer = document.createElement('div');
        linkContainer.className = 'link-container';

        const link = document.createElement('span');
        link.className = 'history-link';
        link.textContent = tab.title || tab.url;

        const time = document.createElement('span');
        time.className = 'visit-time';
        time.textContent = getRelativeTimeString(tab.closedAt);

        const deleteButton = document.createElement('span');
        deleteButton.className = 'delete-button';
        deleteButton.innerHTML = '×';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            chrome.storage.local.get(['closedTabs'], (result) => {
                const closedTabs = result.closedTabs || [];
                const updatedClosedTabs = closedTabs.filter(t => t.id !== tab.id);
                chrome.storage.local.set({ closedTabs: updatedClosedTabs }, () => {
                    loadClosedTabs();
                });
            });
        });

        let isMouseMove = false;
        
        link.addEventListener('mousedown', (e) => {
            isMouseMove = false;
            if (e.button === 1) {
                e.preventDefault();
                e.stopPropagation();
            }
        });

        link.addEventListener('mousemove', () => {
            isMouseMove = true;
        });

        link.addEventListener('mouseup', (e) => {
            if (isMouseMove) return;
            
            if (e.button === 0) {
                e.preventDefault();
                e.stopPropagation();
                chrome.tabs.create({ url: tab.url, active: true });
                window.close();
            } else if (e.button === 1) {
                e.preventDefault();
                e.stopPropagation();
                chrome.tabs.create({ url: tab.url, active: false });
            }
        });

        div.appendChild(favicon);
        linkContainer.appendChild(link);
        linkContainer.appendChild(time);
        div.appendChild(linkContainer);
        div.appendChild(deleteButton);
        closedTabsList.appendChild(div);

        div.addEventListener('mousedown', (e) => {
            if (e.button === 1) {
                e.preventDefault();
                e.stopPropagation();
            }
        });

        div.addEventListener('mouseup', (e) => {
            if (e.button === 1) {
                e.preventDefault();
                e.stopPropagation();
                chrome.tabs.create({ url: tab.url, active: false });
            }
        });

        div.addEventListener('click', (e) => {
            // 只有当点击不是发生在link或delete-button上时才处理
            if (!e.target.classList.contains('delete-button') && !e.target.classList.contains('history-link')) {
                chrome.tabs.create({ url: tab.url, active: true });
                window.close();
            }
        });

        // 禁用时间戳的文本选择
        time.style.userSelect = 'none';
    });

    console.log('Displayed closed tabs', currentClosedTabs);
    
    // 移除任何现有的加载指示器，因为列表已重新渲染
    const existingIndicator = closedTabsList.querySelector('#loadingIndicator');
    if (existingIndicator) {
        existingIndicator.remove();
    }

    // 如果是无限滚动模式，并且加载的项目数量表明可能还有更多，则在末尾添加加载指示器
    // 这个逻辑由 addScrollListener -> loadMoreItems 触发更为合适
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightText(text, keywords) {
    if (!keywords.length) return text;
    const escapedKeywords = keywords.map(escapeRegExp);
    const regex = new RegExp(`(${escapedKeywords.join('|')})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

function getRelativeTimeString(timestamp) {
    const now = new Date().getTime();
    const diff = now - timestamp;
    
    if (diff < 1000) {
        return '0s';
    }
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 7) {
        const date = new Date(timestamp);
        const year = date.getFullYear().toString().slice(-2); // 只使用年份的后两位
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${minute}`;
    } else if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
        return `${hours} hr${hours > 1 ? 's' : ''}`;
    } else if (minutes > 0) {
        return `${minutes} min${minutes > 1 ? 's' : ''}`;
    } else {
        return `${seconds}s`;
    }
}

function faviconURL(websiteUrl) {
    const url = new URL(chrome.runtime.getURL("/_favicon/"));
    url.searchParams.set("pageUrl", websiteUrl);
    url.searchParams.set("size", "16");
    return url.toString();
}

function displayHistoryItems() {
    const historyList = domCache.historyList;
    const searchQuery = domCache.globalSearch.value.trim();
    historyList.innerHTML = '';
    
    // 只有在非瀑布流模式下才重置滚动位置
    if (!isInfiniteScrollMode) {
        historyList.scrollTop = 0;
    }
    
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = currentHistoryItems.slice(start, end);

    pageItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        
        // Update favicon logic to use new faviconURL function
        const favicon = document.createElement('img');
        favicon.className = 'favicon';
        favicon.src = faviconURL(item.url);
        favicon.onerror = () => {
            favicon.src = faviconURL('about:blank');
        };

        const linkContainer = document.createElement('div');
        linkContainer.className = 'link-container';

        const link = document.createElement('span'); // 修改为span
        link.className = 'history-link'; // 添加class以便于样式控制
        link.textContent = item.title || item.url;

        const time = document.createElement('span');
        time.className = 'visit-time';
        time.textContent = getRelativeTimeString(item.lastVisitTime);

        const deleteButton = document.createElement('span');
        deleteButton.className = 'delete-button';
        deleteButton.innerHTML = '×';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            chrome.history.deleteUrl({ url: item.url }, () => {
                loadHistoryItems();
            });
        });

        // 修改添加顺序
        div.appendChild(favicon);
        linkContainer.appendChild(link);
        linkContainer.appendChild(time);
        div.appendChild(linkContainer);
        div.appendChild(deleteButton);
        historyList.appendChild(div);

        // 替换原有的click和mousedown事件处理
        let isMouseMove = false;
        
        link.addEventListener('mousedown', (e) => {
            isMouseMove = false;
            if (e.button === 1) {
                e.preventDefault();
                e.stopPropagation();
            }
        });

        link.addEventListener('mousemove', () => {
            isMouseMove = true;
        });

        link.addEventListener('mouseup', (e) => {
            if (isMouseMove) return;
            
            if (e.button === 0) {
                e.preventDefault();
                e.stopPropagation();
                chrome.tabs.create({ url: item.url, active: true });
                window.close();
            } else if (e.button === 1) {
                e.preventDefault();
                e.stopPropagation();
                chrome.tabs.create({ url: item.url, active: false });
            }
        });

        // 替换为新的滚轮事件处理
        link.addEventListener('wheel', (e) => {
            // 允许事件冒泡到父容器
            e.stopPropagation();
        }, { passive: true });

        div.addEventListener('mousedown', (e) => {
            if (e.button === 1) {
                e.preventDefault();
                e.stopPropagation();
            }
        });

        div.addEventListener('mouseup', (e) => {
            if (e.button === 1) {
                e.preventDefault();
                e.stopPropagation();
                chrome.tabs.create({ url: item.url, active: false });
            }
        });

        div.addEventListener('click', (e) => {
            // 只有当点击不是发生在link或delete-button上时才处理
            if (!e.target.classList.contains('delete-button') && !e.target.classList.contains('history-link')) {
                chrome.tabs.create({ url: item.url, active: true });
                window.close();
            }
        });

        // 禁用时间戳的文本选择
        time.style.userSelect = 'none';
    });
    
    // 如果使用瀑布流模式且还有更多项目可加载，添加加载指示器
    if (isInfiniteScrollMode && currentPage * itemsPerPage < currentHistoryItems.length) {
        historyList.appendChild(createLoadingIndicator());
    }
}

// 替换原来的 updatePagination 和 updateClosedPagination 函数
function updateGlobalPagination(totalItems) {
    requestAnimationFrame(() => {
        const activeTab = document.querySelector('.tab-button.active').dataset.tab;
        const isHistory = activeTab === 'history';
        
        // 始终显示分页信息，即使总条目数为0
        const totalPages = Math.max(1, Math.ceil(Math.max(totalItems, 1) / itemsPerPage));
        
        if (isInfiniteScrollMode) {
            // 在瀑布流模式下，显示已加载项/总项
            const loadedItems = Math.min(currentPage * itemsPerPage, totalItems);
            domCache.globalPageInfo.textContent = `${loadedItems}/${totalItems}`;
        } else {
            // 在分页模式下，显示当前页/总页数
            domCache.globalPageInfo.textContent = `${currentPage}/${totalPages}`;
        }
        
        domCache.globalPrevPage.disabled = currentPage <= 1;
        domCache.globalNextPage.disabled = currentPage >= totalPages || totalItems === 0;
    });
}

// 添加主题应用函数
function applyTheme(theme) {
    if (theme === 'system') {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        document.documentElement.removeAttribute('data-force-theme');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.setAttribute('data-force-theme', theme);
    }
}

function updateLanguageTexts(language) {
    const texts = languageTexts[language];
    if (!texts) {
        console.error(`Language texts not found for language: ${language}`);
        return;
    }
    document.querySelector('.tab-button[data-tab="closed-tabs"]').textContent = texts.recentTabs;
    document.querySelector('.tab-button[data-tab="history"]').textContent = texts.history;
    document.getElementById('globalSearch').placeholder = texts.searchPlaceholder;
    document.getElementById('globalPrevPage').title = texts.prevPage;
    document.getElementById('globalNextPage').title = texts.nextPage;
}