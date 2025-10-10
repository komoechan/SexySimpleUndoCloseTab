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
        showUrlLabel: '显示对应URL:',
        clearModeLabel: '标签页清理模式:',
        clearModeNone: '不处理',
        clearModeIncognito: '仅清空无痕浏览标签页',
        clearModeAll: '清空所有标签页',
        clearModeHelp: '选择当关闭无痕窗口或退出浏览器时的处理方式',
        navigationPositionLabel: '导航位置:',
        pageModeLabel: '翻页模式:',
        navigationPositionTop: '顶部',
        navigationPositionBottom: '底部',
        pageModePagination: '分页按钮',
        pageModeInfinite: '瀑布流',
        dataManagementLabel: '数据管理:',
        clearClosedTabsBtn: '清除所有关闭标签页',
        clearClosedTabsHelp: '此操作将删除所有保存的关闭标签页记录，不影响浏览器历史记录。',
        confirmDeleteTitle: '确认删除',
        confirmDeleteMessage: '您确定要删除所有已保存的关闭标签页吗？此操作不可撤销。',
        tabCountText: '当前保存的标签页数量:',
        cancelBtn: '取消',
        confirmBtn: '确认删除',
        deleteSuccess: '已成功删除所有关闭标签页记录',
        shortcutLabel: '快捷键: 打开最近关闭的标签页',
        shortcutHelp: '默认快捷键：Windows/Linux 为 Ctrl+Shift+Z，Mac 为 Cmd+Shift+Z。您可以点击下方按钮进入浏览器的扩展快捷键设置页面进行修改。',
        shortcutSupportNote: '请注意该功能不一定支持所有的浏览器。',
        openShortcutSettingsBtn: '打开浏览器快捷键设置',
        resetShortcutBtn: '重置为默认',
        shortcutResetInfo: '请在打开的“扩展快捷键”页面中将命令重置为默认，或手动设置为您喜欢的按键组合。'
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
        showUrlLabel: 'Show URL:',
        clearModeLabel: 'Tab Clear Mode:',
        clearModeNone: 'Do Nothing',
        clearModeIncognito: 'Clear Incognito Tabs Only',
        clearModeAll: 'Clear All Tabs',
        clearModeHelp: 'Choose how to handle tabs when closing incognito windows or exiting browser',
        navigationPositionLabel: 'Navigation Position:',
        pageModeLabel: 'Page Mode:',
        navigationPositionTop: 'Top',
        navigationPositionBottom: 'Bottom',
        pageModePagination: 'Pagination',
        pageModeInfinite: 'Infinite',
        dataManagementLabel: 'Data Management:',
        clearClosedTabsBtn: 'Clear All Closed Tabs',
        clearClosedTabsHelp: 'This will delete all saved closed tab records without affecting browser history.',
        confirmDeleteTitle: 'Confirm Delete',
        confirmDeleteMessage: 'Are you sure you want to delete all saved closed tabs? This action cannot be undone.',
        tabCountText: 'Current saved tabs count:',
        cancelBtn: 'Cancel',
        confirmBtn: 'Confirm Delete',
        deleteSuccess: 'Successfully deleted all closed tab records',
        shortcutLabel: 'Shortcut: Open Most Recently Closed Tab',
        shortcutHelp: 'Default: Ctrl+Shift+Z on Windows/Linux, Cmd+Shift+Z on Mac. Click below to open the browser’s extension shortcut settings to change it.',
        shortcutSupportNote: 'Please note that this feature may not support all browsers.',
        openShortcutSettingsBtn: 'Open Browser Shortcut Settings',
        resetShortcutBtn: 'Reset to Default',
        shortcutResetInfo: 'Use the “Extension Shortcuts” page to reset to default or set your preferred key combination.'
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
        showUrlLabel: 'URL を表示:',
        clearModeLabel: 'タブクリアモード:',
        clearModeNone: '何もしない',
        clearModeIncognito: 'プライベートタブのみクリア',
        clearModeAll: 'すべてのタブをクリア',
        clearModeHelp: 'プライベートウィンドウを閉じるかブラウザを終了する際の処理方法を選択',
        navigationPositionLabel: 'ナビゲーション位置:',
        pageModeLabel: 'ページモード:',
        navigationPositionTop: '上部',
        navigationPositionBottom: '下部',
        pageModePagination: 'ページナビゲーション',
        pageModeInfinite: 'インフィニティスクロール',
        dataManagementLabel: 'データ管理:',
        clearClosedTabsBtn: '閉じたタブを全て削除',
        clearClosedTabsHelp: 'この操作により、保存された閉じたタブの記録がすべて削除されます。ブラウザの履歴には影響しません。',
        confirmDeleteTitle: '削除の確認',
        confirmDeleteMessage: '保存されたすべての閉じたタブを削除してもよろしいですか？この操作は元に戻せません。',
        tabCountText: '現在保存されているタブ数:',
        cancelBtn: 'キャンセル',
        confirmBtn: '削除確認',
        deleteSuccess: '閉じたタブの記録を正常に削除しました',
        shortcutLabel: 'ショートカット: 最近閉じたタブを開く',
        shortcutHelp: '既定: Windows/Linux は Ctrl+Shift+Z、Mac は Cmd+Shift+Z。下のボタンをクリックしてブラウザの拡張機能ショートカット設定ページを開き、変更できます。',
        shortcutSupportNote: 'この機能はすべてのブラウザでサポートされない場合があります。',
        openShortcutSettingsBtn: 'ブラウザのショートカット設定を開く',
        resetShortcutBtn: 'デフォルトにリセット',
        shortcutResetInfo: '「拡張機能のショートカット」ページでデフォルトに戻すか、お好みのキーに設定してください。'
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
        showUrlLabel: 'URL 표시:',
        clearModeLabel: '탭 정리 모드:',
        clearModeNone: '아무것도 하지 않음',
        clearModeIncognito: '시크릿 탭만 정리',
        clearModeAll: '모든 탭 정리',
        clearModeHelp: '시크릿 창을 닫거나 브라우저를 종료할 때의 처리 방법을 선택',
        navigationPositionLabel: '탐색 위치:',
        pageModeLabel: '페이지 모드:',
        navigationPositionTop: '상단',
        navigationPositionBottom: '하단',
        pageModePagination: '페이지 탐색',
        pageModeInfinite: '무한 스크롤',
        dataManagementLabel: '데이터 관리:',
        clearClosedTabsBtn: '모든 닫힌 탭 삭제',
        clearClosedTabsHelp: '저장된 모든 닫힌 탭 기록을 삭제합니다. 브라우저 기록에는 영향을 주지 않습니다.',
        confirmDeleteTitle: '삭제 확인',
        confirmDeleteMessage: '저장된 모든 닫힌 탭을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
        tabCountText: '현재 저장된 탭 수:',
        cancelBtn: '취소',
        confirmBtn: '삭제 확인',
        deleteSuccess: '닫힌 탭 기록이 성공적으로 삭제되었습니다',
        shortcutLabel: '단축키: 가장 최근에 닫은 탭 열기',
        shortcutHelp: '기본값: Windows/Linux는 Ctrl+Shift+Z, Mac은 Cmd+Shift+Z. 아래 버튼을 눌러 브라우저 확장 단축키 설정 페이지로 이동하여 변경하세요.',
        shortcutSupportNote: '이 기능은 모든 브라우저에서 지원되지 않을 수 있습니다.',
        openShortcutSettingsBtn: '브라우저 단축키 설정 열기',
        resetShortcutBtn: '기본값으로 재설정',
        shortcutResetInfo: '“확장 프로그램 단축키” 페이지에서 기본값으로 재설정하거나 원하는 키 조합으로 설정하세요.'
    },
    fr: {
        title: 'Options de l\'extension',
        themeLabel: 'Thème:',
        themeSystem: 'Système',
        themeLight: 'Clair',
        themeDark: 'Sombre',
        languageLabel: '🌐Langue:',
        maxRecentLabel: 'Articles récents max:',
        maxRecentHelp: 'Définir le nombre maximum d\'onglets récemment fermés (1-20000)',
        popupWidthLabel: 'Largeur de la fenêtre:',
        popupWidthHelp: 'Définir la largeur de la fenêtre contextuelle (300-800 pixels)',
        showTabCountLabel: 'Afficher le nombre d\'onglets:',
        showUrlLabel: 'Afficher l\'URL:',
        clearModeLabel: 'Mode de nettoyage des onglets:',
        clearModeNone: 'Ne rien faire',
        clearModeIncognito: 'Effacer les onglets privés uniquement',
        clearModeAll: 'Effacer tous les onglets',
        clearModeHelp: 'Choisir comment gérer les onglets lors de la fermeture des fenêtres privées ou de la sortie du navigateur',
        navigationPositionLabel: 'Position de navigation:',
        pageModeLabel: 'Mode de pagination:',
        navigationPositionTop: 'Haut',
        navigationPositionBottom: 'Bas',
        pageModePagination: 'Pagination',
        pageModeInfinite: 'Infini',
        dataManagementLabel: 'Gestion des données:',
        clearClosedTabsBtn: 'Supprimer tous les onglets fermés',
        clearClosedTabsHelp: 'Cette opération supprimera tous les enregistrements d\'onglets fermés sauvegardés sans affecter l\'historique du navigateur.',
        confirmDeleteTitle: 'Confirmer la suppression',
        confirmDeleteMessage: 'Êtes-vous sûr de vouloir supprimer tous les onglets fermés sauvegardés ? Cette action ne peut pas être annulée.',
        tabCountText: 'Nombre d\'onglets actuellement sauvegardés:',
        cancelBtn: 'Annuler',
        confirmBtn: 'Confirmer la suppression',
        deleteSuccess: 'Tous les enregistrements d\'onglets fermés ont été supprimés avec succès',
        shortcutLabel: 'Raccourci : Ouvrir le dernier onglet fermé',
        shortcutHelp: 'Par défaut : Ctrl+Maj+Z sur Windows/Linux, Cmd+Maj+Z sur Mac. Cliquez ci-dessous pour ouvrir la page des raccourcis des extensions du navigateur afin de le modifier.',
        shortcutSupportNote: 'Veuillez noter que cette fonctionnalité peut ne pas être prise en charge par tous les navigateurs.',
        openShortcutSettingsBtn: 'Ouvrir les raccourcis du navigateur',
        resetShortcutBtn: 'Réinitialiser par défaut',
        shortcutResetInfo: 'Utilisez la page « Raccourcis des extensions » pour réinitialiser par défaut ou définir votre combinaison préférée.'
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
        showUrlLabel: 'URL anzeigen:',
        clearModeLabel: 'Tab-Löschmodus:',
        clearModeNone: 'Nichts tun',
        clearModeIncognito: 'Nur Inkognito-Tabs löschen',
        clearModeAll: 'Alle Tabs löschen',
        clearModeHelp: 'Wählen Sie, wie Tabs beim Schließen von Inkognito-Fenstern oder Beenden des Browsers behandelt werden',
        navigationPositionLabel: 'Navigation Position:',
        pageModeLabel: 'Seitenmodus:',
        navigationPositionTop: 'Oben',
        navigationPositionBottom: 'Unten',
        pageModePagination: 'Seitennavigation',
        pageModeInfinite: 'Unendliche Scrollung',
        dataManagementLabel: 'Datenverwaltung:',
        clearClosedTabsBtn: 'Alle geschlossenen Tabs löschen',
        clearClosedTabsHelp: 'Diese Aktion löscht alle gespeicherten Aufzeichnungen geschlossener Tabs, ohne den Browser-Verlauf zu beeinträchtigen.',
        confirmDeleteTitle: 'Löschen bestätigen',
        confirmDeleteMessage: 'Sind Sie sicher, dass Sie alle gespeicherten geschlossenen Tabs löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
        tabCountText: 'Anzahl aktuell gespeicherter Tabs:',
        cancelBtn: 'Abbrechen',
        confirmBtn: 'Löschen bestätigen',
        deleteSuccess: 'Alle Aufzeichnungen geschlossener Tabs wurden erfolgreich gelöscht',
        shortcutLabel: 'Tastenkürzel: Zuletzt geschlossenen Tab öffnen',
        shortcutHelp: 'Standard: Strg+Umschalt+Z unter Windows/Linux, Cmd+Umschalt+Z auf dem Mac. Klicken Sie unten, um die Browserseite für Erweiterungs-Tastenkürzel zu öffnen und dies zu ändern.',
        shortcutSupportNote: 'Bitte beachten Sie, dass diese Funktion möglicherweise nicht von allen Browsern unterstützt wird.',
        openShortcutSettingsBtn: 'Browser-Tastenkürzel öffnen',
        resetShortcutBtn: 'Auf Standard zurücksetzen',
        shortcutResetInfo: 'Verwenden Sie die Seite „Erweiterungs-Tastenkürzel“, um auf Standard zurückzusetzen oder Ihre bevorzugte Tastenfolge festzulegen.'
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
        showTabCountLabel: 'Mostrar número de pestañas:',
        showUrlLabel: 'Mostrar URL:',
        clearModeLabel: 'Modo de limpieza de pestañas:',
        clearModeNone: 'No hacer nada',
        clearModeIncognito: 'Limpiar solo pestañas de incógnito',
        clearModeAll: 'Limpiar todas las pestañas',
        clearModeHelp: 'Elegir cómo manejar las pestañas al cerrar ventanas de incógnito o salir del navegador',
        navigationPositionLabel: 'Posición de navegación:',
        pageModeLabel: 'Modo de paginación:',
        navigationPositionTop: 'Arriba',
        navigationPositionBottom: 'Abajo',
        pageModePagination: 'Paginado',
        pageModeInfinite: 'Infinito',
        dataManagementLabel: 'Gestión de datos:',
        clearClosedTabsBtn: 'Eliminar todas las pestañas cerradas',
        clearClosedTabsHelp: 'Esta operación eliminará todos los registros de pestañas cerradas guardados sin afectar el historial del navegador.',
        confirmDeleteTitle: 'Confirmar eliminación',
        confirmDeleteMessage: '¿Está seguro de que desea eliminar todas las pestañas cerradas guardadas? Esta acción no se puede deshacer.',
        tabCountText: 'Número de pestañas actualmente guardadas:',
        cancelBtn: 'Cancelar',
        confirmBtn: 'Confirmar eliminación',
        deleteSuccess: 'Se eliminaron exitosamente todos los registros de pestañas cerradas',
        shortcutLabel: 'Atajo: Abrir la pestaña cerrada más reciente',
        shortcutHelp: 'Por defecto: Ctrl+Shift+Z en Windows/Linux, Cmd+Shift+Z en Mac. Haga clic abajo para abrir la página de atajos de extensiones del navegador y cambiarlo.',
        shortcutSupportNote: 'Tenga en cuenta que esta función puede no ser compatible con todos los navegadores.',
        openShortcutSettingsBtn: 'Abrir configuración de atajos del navegador',
        resetShortcutBtn: 'Restablecer a predeterminado',
        shortcutResetInfo: 'Use la página «Atajos de extensiones» para restablecer a predeterminado o definir su combinación preferida.'
    }
};

// 在非扩展预览环境提供轻量级 chrome API mock，避免访问报错
(() => {
    const needMock = typeof chrome === 'undefined' || !chrome.storage || !chrome.storage.sync;
    if (needMock) {
        const store = {};
        const storageSync = {
            async get(keys) {
                if (!keys) return { ...store };
                if (Array.isArray(keys)) {
                    const result = {};
                    keys.forEach(k => { result[k] = store[k]; });
                    return result;
                }
                if (typeof keys === 'string') {
                    return { [keys]: store[keys] };
                }
                if (typeof keys === 'object') {
                    const result = {};
                    Object.keys(keys).forEach(k => { result[k] = store[k] ?? keys[k]; });
                    return result;
                }
                return { ...store };
            },
            async set(obj) {
                Object.assign(store, obj);
            }
        };
        const storageOnChanged = { addListener() { /* noop in preview */ } };

        window.chrome = window.chrome || {};
        chrome.storage = chrome.storage || {};
        chrome.storage.sync = storageSync;
        chrome.storage.onChanged = storageOnChanged;
        chrome.tabs = chrome.tabs || { create({ url }) { console.log('[Preview] open tab:', url); } };
        chrome.commands = chrome.commands || { getAll(cb) { cb([]); } };
    }
})();

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
    const maxRecentHelpEl = document.getElementById('maxRecentHelpText') || document.querySelectorAll('.help-text')[0];
    if (maxRecentHelpEl) maxRecentHelpEl.textContent = texts.maxRecentHelp;
    document.querySelector('label[for="popupWidth"]').textContent = texts.popupWidthLabel;
    const popupWidthHelpEl = document.getElementById('popupWidthHelpText') || document.querySelectorAll('.help-text')[1];
    if (popupWidthHelpEl) popupWidthHelpEl.textContent = texts.popupWidthHelp;
    document.querySelector('label[for="showTabCount"]').textContent = texts.showTabCountLabel;
    const showUrlLabelEl = document.querySelector('label[for="showUrl"]');
    if (showUrlLabelEl) {
        showUrlLabelEl.textContent = texts.showUrlLabel;
    }
    document.querySelector('#clearModeLabel').textContent = texts.clearModeLabel;
    document.querySelector('#clearModeNoneLabel').textContent = texts.clearModeNone;
    document.querySelector('#clearModeIncognitoLabel').textContent = texts.clearModeIncognito;
    document.querySelector('#clearModeAllLabel').textContent = texts.clearModeAll;
    const clearModeHelpEl = document.getElementById('clearModeHelpText') || document.querySelectorAll('.help-text')[2];
    if (clearModeHelpEl) clearModeHelpEl.textContent = texts.clearModeHelp;
    document.querySelector('label[for="navigationPosition"]').textContent = texts.navigationPositionLabel;
    document.querySelector('option[value="top"]').textContent = texts.navigationPositionTop;
    document.querySelector('option[value="bottom"]').textContent = texts.navigationPositionBottom;
    document.querySelector('label[for="pageMode"]').textContent = texts.pageModeLabel;
    document.querySelector('option[value="pagination"]').textContent = texts.pageModePagination;
    document.querySelector('option[value="infinite"]').textContent = texts.pageModeInfinite;
    document.querySelector('#dataManagementLabel').textContent = texts.dataManagementLabel;
    document.querySelector('#clearClosedTabsBtn').textContent = texts.clearClosedTabsBtn;
    const dataManagementHelpEl = document.getElementById('dataManagementHelpText') || document.querySelectorAll('.help-text')[3];
    if (dataManagementHelpEl) dataManagementHelpEl.textContent = texts.clearClosedTabsHelp;

    // 快捷键相关文案绑定（存在则更新）
    const shortcutLabelEl = document.querySelector('label[for="shortcutOpenRecent"]');
    if (shortcutLabelEl && texts.shortcutLabel) shortcutLabelEl.textContent = texts.shortcutLabel;
    const shortcutHelpEl = document.getElementById('shortcutHelpText');
    if (shortcutHelpEl && texts.shortcutHelp) shortcutHelpEl.textContent = texts.shortcutHelp;
    const shortcutSupportNoteEl = document.getElementById('shortcutSupportNote');
    if (shortcutSupportNoteEl && texts.shortcutSupportNote) shortcutSupportNoteEl.textContent = texts.shortcutSupportNote;
    const openShortcutSettingsBtn = document.getElementById('openShortcutSettingsBtn');
    if (openShortcutSettingsBtn && texts.openShortcutSettingsBtn) openShortcutSettingsBtn.textContent = texts.openShortcutSettingsBtn;
    const resetShortcutBtn = document.getElementById('resetShortcutBtn');
    if (resetShortcutBtn && texts.resetShortcutBtn) resetShortcutBtn.textContent = texts.resetShortcutBtn;
    
    // 更新模态框文本
    document.getElementById('modalTitle').textContent = texts.confirmDeleteTitle;
    document.getElementById('modalMessage').textContent = texts.confirmDeleteMessage;
    document.getElementById('cancelBtn').textContent = texts.cancelBtn;
    document.getElementById('confirmBtn').textContent = texts.confirmBtn;

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
    const showUrlCheckbox = document.getElementById('showUrl');
    const clearModeRadios = document.querySelectorAll('input[name="clearMode"]');
    const navigationPositionSelect = document.getElementById('navigationPosition');
    const pageModeSelect = document.getElementById('pageMode');
    
    // 获取保存的设置
    const savedSettings = await chrome.storage.sync.get(['theme', 'maxRecent', 'popupWidth', 'language', 'showTabCount', 'showUrl', 'clearMode', 'navigationPosition', 'pageMode']);
    
    // 设置默认值，只有当存储中没有值时才使用默认值
    const savedTheme = savedSettings.theme !== undefined ? savedSettings.theme : 'system';
    const maxRecent = savedSettings.maxRecent !== undefined ? savedSettings.maxRecent : 100;
    const popupWidth = savedSettings.popupWidth !== undefined ? savedSettings.popupWidth : 500;
    const savedLanguage = savedSettings.language !== undefined ? savedSettings.language : 'zh';
    const showTabCount = savedSettings.showTabCount !== undefined ? savedSettings.showTabCount : true;
    const showUrl = savedSettings.showUrl !== undefined ? savedSettings.showUrl : true;
    const clearMode = savedSettings.clearMode !== undefined ? savedSettings.clearMode : 'none';
    const navigationPosition = savedSettings.navigationPosition !== undefined ? savedSettings.navigationPosition : 'top';
    const pageMode = savedSettings.pageMode !== undefined ? savedSettings.pageMode : 'pagination';
    
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

    // 设置显示URL的值
    if (showUrlCheckbox) {
        showUrlCheckbox.checked = showUrl;
    }

    // 设置清理模式的值
    clearModeRadios.forEach(radio => {
        if (radio.value === clearMode) {
            radio.checked = true;
        }
    });

    // 设置导航位置和页面模式的值
    navigationPositionSelect.value = navigationPosition;
    pageModeSelect.value = pageMode;

    // 快捷键显示与操作
    const shortcutInput = document.getElementById('shortcutOpenRecent');
    const shortcutOpenBtn = document.getElementById('openShortcutSettingsBtn');
    const shortcutResetBtn = document.getElementById('resetShortcutBtn');
    const isChromeEnv = typeof chrome !== 'undefined' && !!chrome.commands;
    const defaultShortcut = /Mac/i.test(navigator.platform) ? 'Cmd+Shift+Z' : 'Ctrl+Shift+Z';

    if (shortcutInput) {
        shortcutInput.readOnly = true;
        shortcutInput.placeholder = defaultShortcut;
        if (isChromeEnv && chrome.commands && typeof chrome.commands.getAll === 'function') {
            chrome.commands.getAll((commands) => {
                try {
                    const cmd = commands && commands.find(c => c.name === 'open-most-recently-closed-tab');
                    if (cmd && cmd.shortcut) {
                        shortcutInput.value = cmd.shortcut;
                    } else {
                        shortcutInput.value = defaultShortcut;
                    }
                } catch (e) {
                    shortcutInput.value = defaultShortcut;
                }
            });
        } else {
            shortcutInput.value = defaultShortcut;
        }
    }

    if (shortcutOpenBtn) {
        shortcutOpenBtn.addEventListener('click', () => {
            if (isChromeEnv && chrome.tabs && typeof chrome.tabs.create === 'function') {
                chrome.tabs.create({ url: 'chrome://extensions/shortcuts' });
            } else {
                alert('请在浏览器地址栏输入 chrome://extensions/shortcuts 以打开扩展快捷键设置页面。');
            }
        });
    }

    if (shortcutResetBtn) {
        shortcutResetBtn.addEventListener('click', async () => {
            if (isChromeEnv && chrome.tabs && typeof chrome.tabs.create === 'function') {
                chrome.tabs.create({ url: 'chrome://extensions/shortcuts' });
            }
            // 获取当前语言以显示提示
            let currentLanguage = 'zh';
            try {
                if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync && typeof chrome.storage.sync.get === 'function') {
                    const res = await chrome.storage.sync.get('language');
                    currentLanguage = res.language || 'zh';
                }
            } catch (e) {}
            const texts = languageTexts[currentLanguage] || languageTexts.zh;
            const msg = texts.shortcutResetInfo || 'Please use the browser extension shortcuts page to reset to default or set your preferred keys.';
            alert(msg);
        });
    }

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
        const { language: currentLanguage = 'zh' } = await chrome.storage.sync.get('language');
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
                const { language: currentLanguage = 'zh' } = await chrome.storage.sync.get('language');
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
        const { language: currentLanguage = 'zh' } = await chrome.storage.sync.get('language');
        const unitText = currentLanguage === 'zh' ? '条' : '';
        maxRecentTooltip.textContent = `${value}${unitText}`;
        updateSliderBackground(maxRecentSlider, maxRecentSlider.value);
        await chrome.storage.sync.set({ maxRecent: value });
    });

    // 弹窗宽度滑块和输入框联动
    popupWidthSlider.addEventListener('input', async () => {
        const value = Math.round(300 + popupWidthSlider.value * 31.25);
        popupWidthInput.value = value;
        const { language: currentLanguage = 'zh' } = await chrome.storage.sync.get('language');
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
                const { language: currentLanguage = 'zh' } = await chrome.storage.sync.get('language');
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
        const { language: currentLanguage = 'zh' } = await chrome.storage.sync.get('language');
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

    // 显示URL选择事件监听
    if (showUrlCheckbox) {
        showUrlCheckbox.addEventListener('change', async () => {
            await chrome.storage.sync.set({ showUrl: showUrlCheckbox.checked });
        });
    }

    // 清理模式选择事件监听
    clearModeRadios.forEach(radio => {
        radio.addEventListener('change', async () => {
            if (radio.checked) {
                await chrome.storage.sync.set({ clearMode: radio.value });
            }
        });
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
        if (namespace === 'sync' && changes.showUrl && showUrlCheckbox) {
            showUrlCheckbox.checked = changes.showUrl.newValue;
        }
        if (namespace === 'sync' && changes.navigationPosition) {
            const newNavigationPosition = changes.navigationPosition.newValue;
            navigationPositionSelect.value = newNavigationPosition;
        }
        if (namespace === 'sync' && changes.pageMode) {
            const newPageMode = changes.pageMode.newValue;
            pageModeSelect.value = newPageMode;
        }
        if (namespace === 'sync' && changes.clearMode) {
            const newClearMode = changes.clearMode.newValue;
            clearModeRadios.forEach(radio => {
                radio.checked = radio.value === newClearMode;
            });
        }
    });

    // 模态框相关元素
    const modal = document.getElementById('confirmModal');
    const clearBtn = document.getElementById('clearClosedTabsBtn');
    const closeModal = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const confirmBtn = document.getElementById('confirmBtn');
    const tabCount = document.getElementById('tabCount');

    // 更新标签页数量显示
    async function updateTabCountDisplay() {
        try {
            const { closedTabs = [], incognitoClosedTabs = [] } = await chrome.storage.local.get(['closedTabs', 'incognitoClosedTabs']);
            const { language: currentLanguage = 'zh' } = await chrome.storage.sync.get('language');
            const texts = languageTexts[currentLanguage];
            const totalCount = closedTabs.length + incognitoClosedTabs.length;
            tabCount.innerHTML = `${texts.tabCountText} <strong>${totalCount}</strong> (普通: ${closedTabs.length}, 无痕: ${incognitoClosedTabs.length})`;
        } catch (error) {
            console.error('Error updating tab count:', error);
        }
    }

    // 打开模态框
    clearBtn.addEventListener('click', async () => {
        await updateTabCountDisplay();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    });

    // 关闭模态框的函数
    function closeModalFunc() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // 恢复滚动
    }

    // 关闭模态框事件监听
    closeModal.addEventListener('click', closeModalFunc);
    cancelBtn.addEventListener('click', closeModalFunc);

    // 点击模态框外部关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });

    // ESC键关闭模态框
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModalFunc();
        }
    });

    // 确认删除
    confirmBtn.addEventListener('click', async () => {
        try {
            // 删除所有关闭的标签页记录（包括普通和无痕）
            await chrome.storage.local.set({ closedTabs: [], incognitoClosedTabs: [] });
            
            // 通知后台脚本更新徽章
            chrome.runtime.sendMessage({ type: 'updateBadge' }).catch(() => {
                // 消息发送失败时的后备处理
                console.log('Failed to send message to background script');
            });

            // 显示成功消息
            const { language: currentLanguage = 'zh' } = await chrome.storage.sync.get('language');
            const texts = languageTexts[currentLanguage];
            showSuccessMessage(texts.clearSuccess);
            // 创建成功提示
            showSuccessMessage(texts.deleteSuccess);
            
            closeModalFunc();
        } catch (error) {
            console.error('Error clearing closed tabs:', error);
            alert('删除失败，请重试。');
        }
    });

    // 显示成功消息
    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #28a745;
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            z-index: 1001;
            font-size: 14px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            animation: slideInRight 0.3s ease-out;
        `;
        successDiv.textContent = message;
        
        // 添加动画样式
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(successDiv);
        
        // 3秒后自动移除
        setTimeout(() => {
            successDiv.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => {
                if (successDiv.parentNode) {
                    successDiv.parentNode.removeChild(successDiv);
                }
                if (style.parentNode) {
                    style.parentNode.removeChild(style);
                }
            }, 300);
        }, 3000);
    }

    applyTheme(savedTheme);
});

// 更新滑块值的函数
function updateSliderValue(slider, value, max) {
    const percentage = (value / max) * 100;
    slider.style.setProperty('--slider-value', `${percentage}%`);
}