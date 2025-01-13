import { Page } from "@playwright/test";
import PageObject from "../generic/page-object";
import * as QAP from "../../utility/data/qa-playground.data";

export default class QAPlaygroundMain extends PageObject {

    page: Page;
    url: string;
    cardListData: QAP.QAPlaygroundData;
    genericCardLocator: string;
    cardTitleLocator: string;

    /**
     * QA Playground Main
     * - main page for QA Playground
     * - url: https://qaplayground.dev/
     * @param page 
     */
    constructor(page: Page) {
        super(page);
        this.page = page;
        this.url = QAP.QAPlaygroundMainURL;

        this.cardListData = QAP.QAPlaygroundOptions;

        // Debug
        this.genericCardLocator = '[class="card card-course"]';
        this.cardTitleLocator = 'h3';
    }

    /**
     * Navigates to url https://qaplayground.dev/
     * - only navigates if not already on page
     */
    async navigate() {
        if (await this.getCurrentURL() !== this.url) {
            await this.navigateToURL(this.url);
        }
    }

    /**
     * Selects the option by matching input key
     * @param key 
     */
    async selectOptionByKey(key: QAP.keyOptions) {
        // Get URL extension for input option
        let extension = QAP.QAPlaygroundOptions[key].extension;

        // Create appropriate locator and click it
        let optionLocator = this.page.locator(`[href="/${extension}"]`);
        await optionLocator.click();
    }

    /**
     * Navigates through each card
     * @returns 
     */
    async validateLinks() {
        // Initialize empty error string
        let errorString = '';

        // Iterate through all options
        for (const key in QAP.QAPlaygroundOptions) {
            // Navigate to main page
            await this.navigate();

            // Get model for current option
            let model: QAP.QAPlaygroundOptionModel = QAP.QAPlaygroundOptions[key];

            // Select current option
            await this.selectOptionByKey(model.key)

            // Check URL and append error if validation fails
            let currentURL = await this.getCurrentURL();
            if (!currentURL.includes(model.extension)) {
                errorString += `error with link for ${model.key}:\n expected: ${model.extension}\n actual: ${currentURL}\n\n`;
            }
        }

        // Return errorstring (anything but empty string means failed validation)
        return errorString;
    }

    /**
     * Utility: gets list of all card titles
     */
    async printAllTitles() {
        let elements = await this.page.locator(this.cardTitleLocator).all();
        let list = '';
        for (const element of elements) {
            list += `${await element.innerText()},\n`;
        }
        console.log(list);
    }

    /**
     * Utility: gets list of all card links
     */
    async printAllURLs() {
        let elements = await this.page.locator(this.genericCardLocator).all();
        let list = '';
        for (const element of elements) {
            list += `${await element.getAttribute('href')},\n`;
        }
        console.log(list);
    }
}