export const QAPlaygroundMainURL = 'https://qaplayground.dev/'

export type keyOptions = 'dynamicTable' | 'verifyYourAccount' | 'tagsInputBox' | 'multiLevelDropdown' | 'sortableList' | 'newTab' | 'popUpWindow' | 'nestedIframe' | 'shadowDOM' | 'starsRatingWidget' | 'coveredElements' | 'uploadFile' | 'downloadFile' | 'onboardingModalPopup' | 'budgetTracker' | 'rightClickContextMenu' | 'mouseHover' | 'geolocation' | 'navigationMenu' | 'redirectChain' | 'fetchingData' | 'qRCodeGenerator' | 'changeableIframe' | 'ratingRangeSlider';
export const QAPlaygroundOptions: { key: keyOptions, title: string, extension: string }[] = [
    { key: 'dynamicTable', title: 'Dynamic Table', extension: '/apps/dynamic-table/' },
    { key: 'verifyYourAccount', title: 'Verify Your Account', extension: '/apps/verify-account/' },
    { key: 'tagsInputBox', title: 'Tags Input Box', extension: '/apps/tags-input-box/' },
    { key: 'multiLevelDropdown', title: 'Multi Level Dropdown', extension: '/apps/multi-level-dropdown/' },
    { key: 'sortableList', title: 'Sortable List', extension: '/apps/sortable-list/' },
    { key: 'newTab', title: 'New Tab', extension: '/apps/new-tab/' },
    { key: 'popUpWindow', title: 'Pop - Up Window', extension: '/apps/popup/' },
    { key: 'nestedIframe', title: 'Nested Iframe', extension: '/apps/iframe/' },
    { key: 'shadowDOM', title: 'Shadow DOM', extension: '/apps/shadow-dom/' },
    { key: 'starsRatingWidget', title: 'Stars Rating Widget', extension: '/apps/rating/' },
    { key: 'coveredElements', title: 'Covered Elements', extension: '/apps/covered/' },
    { key: 'uploadFile', title: 'Upload File', extension: '/apps/upload/' },
    { key: 'downloadFile', title: 'Download File', extension: '/apps/download/' },
    { key: 'onboardingModalPopup', title: 'Onboarding Modal Popup', extension: '/apps/onboarding-modal/' },
    { key: 'budgetTracker', title: 'Budget Tracker', extension: '/apps/budget-tracker/' },
    { key: 'rightClickContextMenu', title: 'Right - Click Context Menu', extension: '/apps/context-menu/' },
    { key: 'mouseHover', title: 'Mouse Hover', extension: '/apps/mouse-hover/' },
    { key: 'geolocation', title: 'Geolocation', extension: '/apps/geolocation/' },
    { key: 'navigationMenu', title: 'Navigation Menu', extension: '/apps/links/' },
    { key: 'redirectChain', title: 'Redirect Chain', extension: '/apps/redirect/' },
    { key: 'fetchingData', title: 'Fetching Data', extension: '/apps/fetch/' },
    { key: 'qRCodeGenerator', title: 'QR Code Generator', extension: '/apps/qr-code-generator/' },
    { key: 'changeableIframe', title: 'Changeable Iframe', extension: '/apps/changing-iframe/' },
    { key: 'ratingRangeSlider', title: 'Rating Range Slider', extension: '/apps/range-slider/' },
];