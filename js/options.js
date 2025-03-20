const languageTexts = {
    zh: {
        title: '扩展设置',
        themeLabel: '主题:',
        themeSystem: '跟随系统',
        themeLight: '浅色',
        themeDark: '深色',
        languageLabel: '🌐语言:',
        maxRecentLabel: '最大记录数:',
        maxRecentHelp: '设置最近关闭标签页的最大记录数量 (1-20000)',
        popupWidthLabel: '弹窗宽度:',
        popupWidthHelp: '设置弹出窗口的宽度 (300-800像素)',
        showTabCountLabel: '显示标签页数量:',
        navigationPositionLabel: '导航位置:',
        pageModeLabel: '翻页模式:',
        navigationPositionTop: '顶部',
        navigationPositionBottom: '底部',
        pageModePagination: '分页按钮',
        pageModeInfinite: '瀑布流'
    },
    en: {
        title: 'Extension Options',
        themeLabel: 'Theme:',
        themeSystem: 'System',
        themeLight: 'Light',
        themeDark: 'Dark',
        languageLabel: '🌐Language:',
        maxRecentLabel: 'Max Recent Items:',
        maxRecentHelp: 'Set the maximum number of recently closed tabs (1-20000)',
        popupWidthLabel: 'Popup Width:',
        popupWidthHelp: 'Set the width of the popup window (300-800 pixels)',
        showTabCountLabel: 'Show Tab Count:',
        navigationPositionLabel: 'Navigation Position:',
        pageModeLabel: 'Page Mode:',
        navigationPositionTop: 'Top',
        navigationPositionBottom: 'Bottom',
        pageModePagination: 'Pagination',
        pageModeInfinite: 'Infinite'
    },
    ja: {
        title: '拡張機能の設定',
        themeLabel: 'テーマ:',
        themeSystem: 'システム',
        themeLight: 'ライト',
        themeDark: 'ダーク',
        languageLabel: '🌐言語:',
        maxRecentLabel: '最大履歴数:',
        maxRecentHelp: '最近閉じたタブの最大履歴数を設定 (1-20000)',
        popupWidthLabel: 'ポップアップの幅:',
        popupWidthHelp: 'ポップアップウィンドウの幅を設定 (300-800ピクセル)',
        showTabCountLabel: 'タブ数を表示:',
        navigationPositionLabel: 'ナビゲーション位置:',
        pageModeLabel: 'ページモード:',
        navigationPositionTop: '上部',
        navigationPositionBottom: '下部',
        pageModePagination: 'ページナビゲーション',
        pageModeInfinite: 'インフィニティスクロール'
    },
    ko: {
        title: '확장 설정',
        themeLabel: '테마:',
        themeSystem: '시스템',
        themeLight: '라이트',
        themeDark: '다크',
        languageLabel: '🌐언어:',
        maxRecentLabel: '최대 최근 항목:',
        maxRecentHelp: '최근 닫은 탭의 최대 항목 수 설정 (1-20000)',
        popupWidthLabel: '팝업 너비:',
        popupWidthHelp: '팝업 창의 너비 설정 (300-800픽셀)',
        showTabCountLabel: '탭 수 표시:',
        navigationPositionLabel: '탐색 위치:',
        pageModeLabel: '페이지 모드:',
        navigationPositionTop: '상단',
        navigationPositionBottom: '하단',
        pageModePagination: '페이지 탐색',
        pageModeInfinite: '무한 스크롤'
    },
    fr: {
        title: 'Options de l’extension',
        themeLabel: 'Thème:',
        themeSystem: 'Système',
        themeLight: 'Clair',
        themeDark: 'Sombre',
        languageLabel: '🌐Langue:',
        maxRecentLabel: 'Articles récents max:',
        maxRecentHelp: 'Définir le nombre maximum d’onglets récemment fermés (1-20000)',
        popupWidthLabel: 'Largeur de la fenêtre:',
        popupWidthHelp: 'Définir la largeur de la fenêtre contextuelle (300-800 pixels)',
        showTabCountLabel: 'Afficher le nombre d\'onglets:',
        navigationPositionLabel: 'Position de navigation:',
        pageModeLabel: 'Mode de pagination:',
        navigationPositionTop: 'Haut',
        navigationPositionBottom: 'Bas',
        pageModePagination: 'Pagination',
        pageModeInfinite: 'Infini'
    },
    de: {
        title: 'Erweiterungsoptionen',
        themeLabel: 'Thema:',
        themeSystem: 'System',
        themeLight: 'Hell',
        themeDark: 'Dunkel',
        languageLabel: '🌐Sprache:',
        maxRecentLabel: 'Maximale kürzliche Elemente:',
        maxRecentHelp: 'Maximale Anzahl kürzlich geschlossener Tabs festlegen (1-20000)',
        popupWidthLabel: 'Popup-Breite:',
        popupWidthHelp: 'Breite des Popup-Fensters festlegen (300-800 Pixel)',
        showTabCountLabel: 'Tab-Anzahl anzeigen:',
        navigationPositionLabel: 'Navigation Position:',
        pageModeLabel: 'Seitenmodus:',
        navigationPositionTop: 'Oben',
        navigationPositionBottom: 'Unten',
        pageModePagination: 'Seitennavigation',
        pageModeInfinite: 'Unendliche Scrollung'
    },
    es: {
        title: 'Opciones de la extensión',
        themeLabel: 'Tema:',
        themeSystem: 'Sistema',
        themeLight: 'Claro',
        themeDark: 'Oscuro',
        languageLabel: '🌐Idioma:',
        maxRecentLabel: 'Elementos recientes máximos:',
        maxRecentHelp: 'Establecer el número máximo de pestañas cerradas recientemente (1-20000)',
        popupWidthLabel: 'Ancho de la ventana emergente:',
        popupWidthHelp: 'Establecer el ancho de la ventana emergente (300-800 píxeles)',
        showTabCountLabel: 'Mostrar recuento de pestañas:',
        navigationPositionLabel: 'Posición de navegación:',
        pageModeLabel: 'Modo de paginación:',
        navigationPositionTop: 'Arriba',
        navigationPositionBottom: 'Abajo',
        pageModePagination: 'Paginado',
        pageModeInfinite: 'Infinito'
    }
};

function updateLanguageTexts(language) {
    const texts = languageTexts[language];
    if (!texts) {
        console.error(`Language texts not found for language: ${language}`);
        return;
    }
    document.querySelector('h1').textContent = texts.title;
    document.querySelector('label[for="themeSelect"]').textContent = texts.themeLabel;
    document.querySelector('option[value="light"]').textContent = texts.themeLight;
    document.querySelector('option[value="dark"]').textContent = texts.themeDark;
    document.querySelector('label[for="languageSelect"]').textContent = texts.languageLabel;
    document.querySelector('label[for="maxRecent"]').textContent = texts.maxRecentLabel;
    document.querySelectorAll('.help-text')[0].textContent = texts.maxRecentHelp;
    document.querySelector('label[for="popupWidth"]').textContent = texts.popupWidthLabel;
    document.querySelectorAll('.help-text')[1].textContent = texts.popupWidthHelp;
    document.querySelector('label[for="showTabCount"]').textContent = texts.showTabCountLabel;
    document.querySelector('label[for="navigationPosition"]').textContent = texts.navigationPositionLabel;
    document.querySelector('option[value="top"]').textContent = texts.navigationPositionTop;
    document.querySelector('option[value="bottom"]').textContent = texts.navigationPositionBottom;
    document.querySelector('label[for="pageMode"]').textContent = texts.pageModeLabel;
    document.querySelector('option[value="pagination"]').textContent = texts.pageModePagination;
    document.querySelector('option[value="infinite"]').textContent = texts.pageModeInfinite;

    // 更新最大记录数的单位显示
    const maxRecentValue = document.getElementById('maxRecent').value;
    const unitText = language === 'zh' ? '条' : '';
    document.getElementById('maxRecentTooltip').textContent = `${maxRecentValue}${unitText}`;

    // 更新弹窗宽度的单位显示
    const popupWidthValue = document.getElementById('popupWidth').value;
    const pixelText = language === 'zh' ? '像素' : 'px';
    document.getElementById('popupWidthTooltip').textContent = `${popupWidthValue}${pixelText}`;
}

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

document.addEventListener('DOMContentLoaded', async () => {
    const themeSelect = document.getElementById('themeSelect');
    const maxRecentInput = document.getElementById('maxRecent');
    const maxRecentSlider = document.getElementById('maxRecentSlider');
    const maxRecentTooltip = document.getElementById('maxRecentTooltip');
    const popupWidthInput = document.getElementById('popupWidth');
    const popupWidthSlider = document.getElementById('popupWidthSlider');
    const popupWidthTooltip = document.getElementById('popupWidthTooltip');
    const languageSelect = document.getElementById('languageSelect');
    const showTabCountCheckbox = document.getElementById('showTabCount');
    const navigationPositionSelect = document.getElementById('navigationPosition');
    const pageModeSelect = document.getElementById('pageMode');
    
    // 获取保存的设置
    const { theme: savedTheme = 'system', maxRecent = 100, popupWidth = 500, language: savedLanguage = 'en', showTabCount = true, navigationPosition = 'top', pageMode = 'pagination' } = await chrome.storage.sync.get(['theme', 'maxRecent', 'popupWidth', 'language', 'showTabCount', 'navigationPosition', 'pageMode']);
    
    // 立即应用主题
    themeSelect.value = savedTheme;
    applyTheme(savedTheme);

    // 设置最大记录数的值（考虑滑块和输入框）
    const maxRecentValue = Math.max(1, Math.min(20000, maxRecent));
    maxRecentInput.value = maxRecentValue;
    maxRecentSlider.value = maxRecentValue / 1000;
    updateSliderBackground(maxRecentSlider, maxRecentSlider.value);
    maxRecentTooltip.textContent = `${maxRecentValue}条`;

    // 设置弹窗宽度的值（考虑滑块和输入框）
    const popupWidthValue = Math.max(300, Math.min(800, popupWidth));
    popupWidthInput.value = popupWidthValue;
    popupWidthSlider.value = Math.round((popupWidthValue - 300) / 31.25);
    updateSliderBackground(popupWidthSlider, popupWidthSlider.value);
    popupWidthTooltip.textContent = `${popupWidthValue}px`;

    // 设置初始语言文本
    languageSelect.value = savedLanguage;
    updateLanguageTexts(savedLanguage);

    // 设置显示标签页数量的值
    showTabCountCheckbox.checked = showTabCount;

    // 设置导航位置和页面模式的值
    navigationPositionSelect.value = navigationPosition;
    pageModeSelect.value = pageMode;

    // 更新滑块渐变效果的函数
    function updateSliderBackground(slider, value) {
        const percentage = ((value - slider.min) / (slider.max - slider.min)) * 100;
        slider.style.setProperty('--slider-value', `${percentage}%`);
    }

    // 初始化时更新滑块渐变
    updateSliderBackground(maxRecentSlider, maxRecentValue / 1000);
    updateSliderBackground(popupWidthSlider, (popupWidthValue - 300) / 30);

    // 主题选择事件监听
    themeSelect.addEventListener('change', async () => {
        const selectedTheme = themeSelect.value;
        await chrome.storage.sync.set({ theme: selectedTheme });
        applyTheme(selectedTheme);
    });

    // 最大记录数滑块和输入框联动
    maxRecentSlider.addEventListener('input', async () => {
        const value = Math.round(maxRecentSlider.value * 1000);
        maxRecentInput.value = value;
        const { language: currentLanguage = 'en' } = await chrome.storage.sync.get('language');
        const unitText = currentLanguage === 'zh' ? '条' : '';
        maxRecentTooltip.textContent = `${value}${unitText}`;
        updateSliderBackground(maxRecentSlider, maxRecentSlider.value);
        await chrome.storage.sync.set({ maxRecent: value });
    });

    // 延迟验证和保存最大记录数
    let maxRecentTimeout;
    maxRecentInput.addEventListener('input', () => {
        clearTimeout(maxRecentTimeout);
        const value = parseInt(maxRecentInput.value, 10);
        if (!isNaN(value)) {
            if (value < 1 || value > 20000) {
                maxRecentInput.classList.add('error');
            } else {
                maxRecentInput.classList.remove('error');
            }
            maxRecentTimeout = setTimeout(async () => {
                const adjustedValue = Math.max(1, Math.min(20000, value));
                maxRecentInput.value = adjustedValue;
                maxRecentInput.classList.remove('error');
                maxRecentSlider.value = adjustedValue / 1000;
                const { language: currentLanguage = 'en' } = await chrome.storage.sync.get('language');
                const unitText = currentLanguage === 'zh' ? '条' : '';
                maxRecentTooltip.textContent = `${adjustedValue}${unitText}`;
                updateSliderBackground(maxRecentSlider, maxRecentSlider.value);
                await chrome.storage.sync.set({ maxRecent: adjustedValue });
            }, 1000);
        }
    });

    maxRecentInput.addEventListener('blur', async () => {
        clearTimeout(maxRecentTimeout);
        let value = parseInt(maxRecentInput.value, 10);
        if (isNaN(value) || value < 1) value = 1;
        if (value > 20000) value = 20000;
        maxRecentInput.value = value;
        maxRecentInput.classList.remove('error');
        maxRecentSlider.value = value / 1000;
        const { language: currentLanguage = 'en' } = await chrome.storage.sync.get('language');
        const unitText = currentLanguage === 'zh' ? '条' : '';
        maxRecentTooltip.textContent = `${value}${unitText}`;
        updateSliderBackground(maxRecentSlider, maxRecentSlider.value);
        await chrome.storage.sync.set({ maxRecent: value });
    });

    // 弹窗宽度滑块和输入框联动
    popupWidthSlider.addEventListener('input', async () => {
        const value = Math.round(300 + popupWidthSlider.value * 31.25);
        popupWidthInput.value = value;
        const { language: currentLanguage = 'en' } = await chrome.storage.sync.get('language');
        const pixelText = currentLanguage === 'zh' ? '像素' : 'px';
        popupWidthTooltip.textContent = `${value}${pixelText}`;
        updateSliderBackground(popupWidthSlider, popupWidthSlider.value);
        await chrome.storage.sync.set({ popupWidth: value });
    });

    // 延迟验证和保存弹窗宽度
    let popupWidthTimeout;
    popupWidthInput.addEventListener('input', () => {
        clearTimeout(popupWidthTimeout);
        const value = parseInt(popupWidthInput.value, 10);
        if (!isNaN(value)) {
            if (value < 300 || value > 800) {
                popupWidthInput.classList.add('error');
            } else {
                popupWidthInput.classList.remove('error');
            }
            popupWidthTimeout = setTimeout(async () => {
                const adjustedValue = Math.max(300, Math.min(800, value));
                popupWidthInput.value = adjustedValue;
                popupWidthInput.classList.remove('error');
                popupWidthSlider.value = Math.round((adjustedValue - 300) / 31.25);
                const { language: currentLanguage = 'en' } = await chrome.storage.sync.get('language');
                const pixelText = currentLanguage === 'zh' ? '像素' : 'px';
                popupWidthTooltip.textContent = `${adjustedValue}${pixelText}`;
                updateSliderBackground(popupWidthSlider, popupWidthSlider.value);
                await chrome.storage.sync.set({ popupWidth: adjustedValue });
            }, 1000);
        }
    });

    popupWidthInput.addEventListener('blur', async () => {
        clearTimeout(popupWidthTimeout);
        let value = parseInt(popupWidthInput.value, 10);
        if (isNaN(value) || value < 300) value = 300;
        if (value > 800) value = 800;
        popupWidthInput.value = value;
        popupWidthInput.classList.remove('error');
        popupWidthSlider.value = Math.round((value - 300) / 31.25);
        const { language: currentLanguage = 'en' } = await chrome.storage.sync.get('language');
        const pixelText = currentLanguage === 'zh' ? '像素' : 'px';
        popupWidthTooltip.textContent = `${value}${pixelText}`;
        updateSliderBackground(popupWidthSlider, popupWidthSlider.value);
        await chrome.storage.sync.set({ popupWidth: value });
    });

    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (themeSelect.value === 'system') {
            applyTheme('system');
        }
    });

    // 语言选择事件监听
    languageSelect.addEventListener('change', async () => {
        const selectedLanguage = languageSelect.value;
        await chrome.storage.sync.set({ language: selectedLanguage });
        updateLanguageTexts(selectedLanguage);
    });

    // 显示标签页数量选择事件监听
    showTabCountCheckbox.addEventListener('change', async () => {
        await chrome.storage.sync.set({ showTabCount: showTabCountCheckbox.checked });
    });

    // 导航位置选择事件监听
    navigationPositionSelect.addEventListener('change', async () => {
        const selectedPosition = navigationPositionSelect.value;
        await chrome.storage.sync.set({ navigationPosition: selectedPosition });
    });

    // 页面模式选择事件监听
    pageModeSelect.addEventListener('change', async () => {
        const selectedMode = pageModeSelect.value;
        await chrome.storage.sync.set({ pageMode: selectedMode });
    });

    // 监听存储变化
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'sync' && changes.theme) {
            const newTheme = changes.theme.newValue;
            themeSelect.value = newTheme;
            applyTheme(newTheme);
        }
        if (namespace === 'sync' && changes.maxRecent) {
            const newMaxRecent = changes.maxRecent.newValue;
            maxRecentInput.value = newMaxRecent;
            maxRecentSlider.value = newMaxRecent / 1000;
        }
        if (namespace === 'sync' && changes.popupWidth) {
            const newPopupWidth = changes.popupWidth.newValue;
            popupWidthInput.value = newPopupWidth;
            popupWidthSlider.value = (newPopupWidth - 300) / 30;
        }
        if (namespace === 'sync' && changes.language) {
            const newLanguage = changes.language.newValue;
            languageSelect.value = newLanguage;
            updateLanguageTexts(newLanguage);
        }
        if (namespace === 'sync' && changes.showTabCount) {
            showTabCountCheckbox.checked = changes.showTabCount.newValue;
        }
        if (namespace === 'sync' && changes.navigationPosition) {
            const newNavigationPosition = changes.navigationPosition.newValue;
            navigationPositionSelect.value = newNavigationPosition;
        }
        if (namespace === 'sync' && changes.pageMode) {
            const newPageMode = changes.pageMode.newValue;
            pageModeSelect.value = newPageMode;
        }
    });

    applyTheme(savedTheme);
});

// 更新滑块值的函数
function updateSliderValue(slider, value, max) {
    const percentage = (value / max) * 100;
    slider.style.setProperty('--slider-value', `${percentage}%`);
}