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

async function updateUI() {
    const { language = 'en' } = await chrome.storage.sync.get('language');
    const texts = languageTexts[language] || languageTexts.en;
    
    // 更新所有文本
    if (document.querySelector('#globalPrevPage')) {
        document.querySelector('#globalPrevPage').title = texts.prevPage;
    }
    if (document.querySelector('#globalNextPage')) {
        document.querySelector('#globalNextPage').title = texts.nextPage;
    }
    if (document.querySelector('.tab-button[data-tab="closed-tabs"]')) {
        document.querySelector('.tab-button[data-tab="closed-tabs"]').textContent = texts.recentTabs;
    }
    if (document.querySelector('.tab-button[data-tab="history"]')) {
        document.querySelector('.tab-button[data-tab="history"]').textContent = texts.history;
    }
    if (document.getElementById('globalSearch')) {
        document.getElementById('globalSearch').placeholder = texts.searchPlaceholder;
    }
}

// 在 DOMContentLoaded 之前添加主题初始化代码
(async function initializeTheme() {
    const { theme = 'system' } = await chrome.storage.sync.get('theme');
    applyTheme(theme);
})();

let currentPage = 1;
let currentHistoryItems = [];
let currentClosedTabs = [];
let tabButtons; // 添加全局变量
const itemsPerPage = 20;
let isInfiniteScrollMode = false; // 添加一个标志来追踪当前是否为瀑布流模式

document.addEventListener('DOMContentLoaded', async () => {
    const globalSearch = document.getElementById('globalSearch');
    const historyList = document.getElementById('historyList');
    const closedTabsList = document.getElementById('closedTabsList');
    const globalPrevPage = document.getElementById('globalPrevPage');
    const globalNextPage = document.getElementById('globalNextPage');
    tabButtons = document.querySelectorAll('.tab-button'); // 给全局变量赋值

    // 优化 macOS 触摸板滚动
    let lastTouchTime = 0;
    historyList.addEventListener('touchstart', () => {
        lastTouchTime = Date.now();
    }, { passive: true });

    historyList.addEventListener('scroll', () => {
        // 只有非触摸滚动时才应用 pointerEvents 修复
        if (Date.now() - lastTouchTime > 300) {
            historyList.style.pointerEvents = 'none';
            requestAnimationFrame(() => {
                historyList.style.pointerEvents = 'auto';
            });
        }
    }, { passive: true });

    // 优化滚轮事件处理
    historyList.addEventListener('wheel', (e) => {
        const isAtTop = historyList.scrollTop === 0;
        const isAtBottom = historyList.scrollHeight - historyList.scrollTop === historyList.clientHeight;

        // 只在到达边界时阻止默认行为
        if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
            e.preventDefault();
        }
    }, { passive: false });

    globalSearch.focus();

    globalSearch.addEventListener('input', () => {
        // 搜索时总是重置页码和列表内容
        currentPage = 1;
        const activeTab = document.querySelector('.tab-button.active').dataset.tab;
        
        // 清空搜索框时移除计数显示
        if (!globalSearch.value.trim()) {
            document.querySelectorAll('.tab-button .count').forEach(el => el.remove());
        }
        
        if (activeTab === 'history') {
            loadHistoryItems(false); // 搜索时始终使用false强制刷新
            // 只在有搜索内容时预加载另一个标签的数据
            if (globalSearch.value.trim()) {
                chrome.storage.local.get(['closedTabs'], (result) => {
                    const query = globalSearch.value.toLowerCase();
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
            // 只在有搜索内容时预加载另一个标签的数据
            if (globalSearch.value.trim()) {
                chrome.history.search({
                    text: '',
                    startTime: 0,
                    maxResults: 2147483647
                }, (historyItems) => {
                    const query = globalSearch.value.trim();
                    if (query) {
                        const queryLower = query.toLowerCase();
                        currentHistoryItems = historyItems.filter(item => 
                            (item.title && item.title.toLowerCase().includes(queryLower)) || 
                            item.url.toLowerCase().includes(queryLower)
                        );
                    } else {
                        currentHistoryItems = historyItems;
                    }
                    updateTabCounts();
                });
            }
        }
    });

    globalPrevPage.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            if (document.querySelector('.tab-button.active').dataset.tab === 'history') {
                loadHistoryItems();
            } else {
                loadClosedTabs();
            }
        }
    });

    globalNextPage.addEventListener('click', () => {
        currentPage++;
        if (document.querySelector('.tab-button.active').dataset.tab === 'history') {
            loadHistoryItems();
        } else {
            loadClosedTabs();
        }
    });

    document.addEventListener('click', (e) => {
        // 仅在左键点击时关闭窗口
        if (e.button === 0 && !e.target.closest('.container')) {
            window.close();
        }
    });

    tabButtons.forEach(button => {
        button.addEventListener('click', async () => {
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
                loadHistoryItems(false); // 始终使用false确保切换标签时清空内容
                // 只在有搜索内容时预加载 closed tabs 数据
                if (globalSearch.value.trim()) {
                    chrome.storage.local.get(['closedTabs'], (result) => {
                        const query = globalSearch.value.toLowerCase();
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
                if (globalSearch.value.trim()) {
                    chrome.history.search({
                        text: '',
                        startTime: 0,
                        maxResults: 2147483647
                    }, (historyItems) => {
                        if (globalSearch.value.trim()) {
                            const queryLower = globalSearch.value.toLowerCase();
                            currentHistoryItems = historyItems.filter(item => 
                                (item.title && item.title.toLowerCase().includes(queryLower)) || 
                                item.url.toLowerCase().includes(queryLower)
                            );
                        } else {
                            currentHistoryItems = historyItems;
                        }
                        updateTabCounts();
                    });
                }
            }

            const { language: currentLanguage = 'en' } = await chrome.storage.sync.get('language');
            const texts = languageTexts[currentLanguage];
            globalSearch.placeholder = texts.searchPlaceholder;
        });
    });

    // 初始化搜索框 placeholder
    const initialTab = document.querySelector('.tab-button.active').dataset.tab;
    const { language: currentLanguage = 'en' } = await chrome.storage.sync.get('language');
    const texts = languageTexts[currentLanguage];
    globalSearch.placeholder = texts.searchPlaceholder;

    // 确保初始加载时正确显示数据，无论是否有搜索查询
    const activeTab = document.querySelector('.tab-button.active').dataset.tab;
    if (activeTab === 'history') {
        chrome.history.search({
            text: '',
            startTime: 0,
            maxResults: 2147483647
        }, (historyItems) => {
            currentHistoryItems = historyItems;
            displayHistoryItems();
            updateGlobalPagination(currentHistoryItems.length);
        });
    } else {
        loadClosedTabs();
    }

    // 从 chrome.storage.sync 获取主题设置
    const { theme: savedTheme = 'system' } = await chrome.storage.sync.get('theme');
    applyTheme(savedTheme);

    // 获取并应用宽度设置
    const { popupWidth = 500 } = await chrome.storage.sync.get(['popupWidth']);
    document.documentElement.style.setProperty('--popup-width', `${popupWidth}px`);

    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', async (e) => {
        const { theme: currentTheme = 'system' } = await chrome.storage.sync.get('theme');
        if (currentTheme === 'system') {
            applyTheme('system');
        }
    });

    // 监听其他页面的主题变化
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'sync' && changes.theme) {
            const newTheme = changes.theme.newValue;
            applyTheme(newTheme);
        }
        if (namespace === 'sync') {
            if (changes.popupWidth) {
                const newWidth = changes.popupWidth.newValue;
                document.documentElement.style.setProperty('--popup-width', `${newWidth}px`);
            }
        }
    });

    // 设置初始语言文本
    const { language: savedLanguage = 'en' } = await chrome.storage.sync.get('language');
    updateLanguageTexts(savedLanguage);

    // 监听语言设置变化
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'sync' && changes.language) {
            const newLanguage = changes.language.newValue;
            updateLanguageTexts(newLanguage);
        }
    });

    // 设置初始语言文本
    updateLanguageTexts(savedLanguage);

    // 初始化UI文本
    await updateUI();
    
    // 监听语言变化
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'sync' && changes.language) {
            updateUI();
        }
    });

    const { navigationPosition = 'top', pageMode = 'pagination' } = await chrome.storage.sync.get(['navigationPosition', 'pageMode']);

    // 根据导航位置设置模块位置
    const container = document.querySelector('.container');
    if (navigationPosition === 'bottom') {
        container.classList.add('bottom-navigation');
    } else {
        container.classList.remove('bottom-navigation');
    }

    // 根据页面模式设置翻页模式
    if (pageMode === 'infinite') {
        globalPrevPage.style.display = 'none';
        globalNextPage.style.display = 'none';
        isInfiniteScrollMode = true;
        
        // 为每个列表容器添加滚动事件监听器，以便在接近底部时加载更多内容
        const historyList = document.getElementById('historyList');
        const closedTabsList = document.getElementById('closedTabsList');
        
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
        addScrollListener(historyList);
        addScrollListener(closedTabsList);
    } else {
        isInfiniteScrollMode = false;
        globalPrevPage.style.display = 'block';
        globalNextPage.style.display = 'block';
    }
});

function updateTabCounts() {
    const query = document.getElementById('globalSearch').value.trim();
    if (!query) {
        document.querySelectorAll('.tab-button .count').forEach(el => el.remove());
        return;
    }

    const historyCount = currentHistoryItems.length;
    const closedCount = currentClosedTabs.length;
    
    const formatCount = (count) => count > 99 ? '99+' : count;

    tabButtons.forEach(button => {
        let countEl = button.querySelector('.count');
        if (!countEl) {
            countEl = document.createElement('span');
            countEl.className = 'count';
            button.appendChild(countEl);
        }
        
        const count = button.dataset.tab === 'history' ? historyCount : closedCount;
        countEl.textContent = ` (${formatCount(count)})`;
    });
}

function loadHistoryItems(append = false) {
    const query = document.getElementById('globalSearch').value;
    const startTime = 0;
    
    // 确保是当前活动标签才更新UI
    if (document.querySelector('.tab-button.active').dataset.tab !== 'history') {
        return;
    }
    
    // 修改搜索条件，当搜索框为空时搜索所有历史记录
    chrome.history.search({
        text: '',  // 始终搜索所有历史记录
        startTime: startTime,
        maxResults: 2147483647
    }, (historyItems) => {
        // 如果有搜索查询，过滤结果
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
        updateTabCounts();
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
    const historyList = document.getElementById('historyList');
    
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

        div.addEventListener('mouseup', (e) => {
            if (e.button === 1) {
                e.preventDefault();
                e.stopPropagation();
                chrome.tabs.create({ url: item.url, active: false });
            }
        });

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
    const query = document.getElementById('globalSearch').value.toLowerCase();
    
    // 确保是当前活动标签才更新UI
    if (document.querySelector('.tab-button.active').dataset.tab !== 'closed-tabs') {
        return;
    }
    
    chrome.storage.local.get(['closedTabs'], (result) => {
        console.log('Loaded closed tabs from storage', result.closedTabs); // 添加调试日志
        currentClosedTabs = result.closedTabs || [];
        if (query) {
            currentClosedTabs = currentClosedTabs.filter(tab => tab.title.toLowerCase().includes(query) || tab.url.toLowerCase().includes(query));
        }
        
        // 在瀑布流模式下，仅首次加载或搜索时清空列表
        if (!isInfiniteScrollMode || !append) {
            // 实现分页加载
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const pageItems = currentClosedTabs.slice(start, end);
            
            displayClosedTabs(pageItems);
        } else {
            // 在瀑布流模式下追加显示项目
            appendClosedTabs();
        }
        
        updateGlobalPagination(currentClosedTabs.length);
        updateTabCounts();
    });
}

// 修改appendClosedTabs函数，使用新的createLoadingIndicator函数
function appendClosedTabs() {
    const closedTabsList = document.getElementById('closedTabsList');
    
    // 计算当前页的起始和结束索引
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = currentClosedTabs.slice(start, end);
    
    // 如果没有更多项目可加载，则不执行任何操作
    if (pageItems.length === 0) {
        return;
    }
    
    // 移除任何现有的加载指示器
    const existingIndicator = closedTabsList.querySelector('#loadingIndicator');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    // 追加新项目
    pageItems.forEach(tab => {
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
    if (currentPage * itemsPerPage < currentClosedTabs.length) {
        closedTabsList.appendChild(createLoadingIndicator());
    }
}

function displayClosedTabs(pageItems) {
    const closedTabsList = document.getElementById('closedTabsList');
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
    
    // 如果使用瀑布流模式且还有更多项目可加载，添加加载指示器
    if (isInfiniteScrollMode && currentPage * itemsPerPage < currentClosedTabs.length) {
        closedTabsList.appendChild(createLoadingIndicator());
    }
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
    const historyList = document.getElementById('historyList');
    const searchQuery = document.getElementById('globalSearch').value.trim();
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
            document.getElementById('globalPageInfo').textContent = `${loadedItems}/${totalItems}`;
        } else {
            // 在分页模式下，显示当前页/总页数
            document.getElementById('globalPageInfo').textContent = `${currentPage}/${totalPages}`;
        }
        
        document.getElementById('globalPrevPage').disabled = currentPage <= 1;
        document.getElementById('globalNextPage').disabled = currentPage >= totalPages || totalItems === 0;
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