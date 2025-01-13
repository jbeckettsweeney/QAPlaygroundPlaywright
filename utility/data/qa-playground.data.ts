
/**
 * Main URL for QA Playground, ending with "/"
 */
export const QAPlaygroundMainURL = 'https://qaplayground.dev/'

/**
 * Limited specific key options for each of the 24 mini-apps within QA Playground
 */
export type keyOptions = 'dynamicTable' | 'verifyYourAccount' | 'tagsInputBox' | 'multiLevelDropdown' | 'sortableList' | 'newTab' | 'popUpWindow' | 'nestedIframe' | 'shadowDOM' | 'starsRatingWidget' | 'coveredElements' | 'uploadFile' | 'downloadFile' | 'onboardingModalPopup' | 'budgetTracker' | 'rightClickContextMenu' | 'mouseHover' | 'geolocation' | 'navigationMenu' | 'redirectChain' | 'fetchingData' | 'qrCodeGenerator' | 'changeableIframe' | 'ratingRangeSlider';

//
export type QAPlaygroundData = {
    dynamicTable: QAPlaygroundOptionModel, verifyYourAccount: QAPlaygroundOptionModel, tagsInputBox: QAPlaygroundOptionModel, multiLevelDropdown: QAPlaygroundOptionModel, sortableList: QAPlaygroundOptionModel, newTab: QAPlaygroundOptionModel, popUpWindow: QAPlaygroundOptionModel, nestedIframe: QAPlaygroundOptionModel, shadowDOM: QAPlaygroundOptionModel, starsRatingWidget: QAPlaygroundOptionModel, coveredElements: QAPlaygroundOptionModel, uploadFile: QAPlaygroundOptionModel, downloadFile: QAPlaygroundOptionModel, onboardingModalPopup: QAPlaygroundOptionModel, budgetTracker: QAPlaygroundOptionModel, rightClickContextMenu: QAPlaygroundOptionModel, mouseHover: QAPlaygroundOptionModel, geolocation: QAPlaygroundOptionModel, navigationMenu: QAPlaygroundOptionModel, redirectChain: QAPlaygroundOptionModel, fetchingData: QAPlaygroundOptionModel, qrCodeGenerator: QAPlaygroundOptionModel, changeableIframe: QAPlaygroundOptionModel, ratingRangeSlider: QAPlaygroundOptionModel,
}

/**
 * Model for QA Playground Options
 * - useful for keeping list of relevant data for each option
 */
export class QAPlaygroundOptionModel {

    key: keyOptions;
    title: string;
    extension: string;

    /**
     * Model for QA Playground Options
     * @param data 
     */
    constructor(data: {
        key: keyOptions,
        title: string,
        extension: string
    }) {
        this.key = data.key;
        this.title = data.title;
        this.extension = data.extension;
    }
}

/**
 * List of QA Playground Options as models
 */
export const QAPlaygroundOptions: QAPlaygroundData = {
    dynamicTable: new QAPlaygroundOptionModel({ key: 'dynamicTable', title: 'Dynamic Table', extension: 'apps/dynamic-table/' }),
    verifyYourAccount: new QAPlaygroundOptionModel({ key: 'verifyYourAccount', title: 'Verify Your Account', extension: 'apps/verify-account/' }),
    tagsInputBox: new QAPlaygroundOptionModel({ key: 'tagsInputBox', title: 'Tags Input Box', extension: 'apps/tags-input-box/' }),
    multiLevelDropdown: new QAPlaygroundOptionModel({ key: 'multiLevelDropdown', title: 'Multi Level Dropdown', extension: 'apps/multi-level-dropdown/' }),
    sortableList: new QAPlaygroundOptionModel({ key: 'sortableList', title: 'Sortable List', extension: 'apps/sortable-list/' }),
    newTab: new QAPlaygroundOptionModel({ key: 'newTab', title: 'New Tab', extension: 'apps/new-tab/' }),
    popUpWindow: new QAPlaygroundOptionModel({ key: 'popUpWindow', title: 'Pop - Up Window', extension: 'apps/popup/' }),
    nestedIframe: new QAPlaygroundOptionModel({ key: 'nestedIframe', title: 'Nested Iframe', extension: 'apps/iframe/' }),
    shadowDOM: new QAPlaygroundOptionModel({ key: 'shadowDOM', title: 'Shadow DOM', extension: 'apps/shadow-dom/' }),
    starsRatingWidget: new QAPlaygroundOptionModel({ key: 'starsRatingWidget', title: 'Stars Rating Widget', extension: 'apps/rating/' }),
    coveredElements: new QAPlaygroundOptionModel({ key: 'coveredElements', title: 'Covered Elements', extension: 'apps/covered/' }),
    uploadFile: new QAPlaygroundOptionModel({ key: 'uploadFile', title: 'Upload File', extension: 'apps/upload/' }),
    downloadFile: new QAPlaygroundOptionModel({ key: 'downloadFile', title: 'Download File', extension: 'apps/download/' }),
    onboardingModalPopup: new QAPlaygroundOptionModel({ key: 'onboardingModalPopup', title: 'Onboarding Modal Popup', extension: 'apps/onboarding-modal/' }),
    budgetTracker: new QAPlaygroundOptionModel({ key: 'budgetTracker', title: 'Budget Tracker', extension: 'apps/budget-tracker/' }),
    rightClickContextMenu: new QAPlaygroundOptionModel({ key: 'rightClickContextMenu', title: 'Right - Click Context Menu', extension: 'apps/context-menu/' }),
    mouseHover: new QAPlaygroundOptionModel({ key: 'mouseHover', title: 'Mouse Hover', extension: 'apps/mouse-hover/' }),
    geolocation: new QAPlaygroundOptionModel({ key: 'geolocation', title: 'Geolocation', extension: 'apps/geolocation/' }),
    navigationMenu: new QAPlaygroundOptionModel({ key: 'navigationMenu', title: 'Navigation Menu', extension: 'apps/links/' }),
    redirectChain: new QAPlaygroundOptionModel({ key: 'redirectChain', title: 'Redirect Chain', extension: 'apps/redirect/' }),
    fetchingData: new QAPlaygroundOptionModel({ key: 'fetchingData', title: 'Fetching Data', extension: 'apps/fetch/' }),
    qrCodeGenerator: new QAPlaygroundOptionModel({ key: 'qrCodeGenerator', title: 'QR Code Generator', extension: 'apps/qr-code-generator/' }),
    changeableIframe: new QAPlaygroundOptionModel({ key: 'changeableIframe', title: 'Changeable Iframe', extension: 'apps/changing-iframe/' }),
    ratingRangeSlider: new QAPlaygroundOptionModel({ key: 'ratingRangeSlider', title: 'Rating Range Slider', extension: 'apps/range-slider/' }),
};