import { Page } from "@playwright/test";
import PageObject from "../generic/page-object";
import { QAPlaygroundMainURL, keyOptions, QAPlaygroundOptions } from "./qa-playground.constants";

export default class QAPlaygroundMain extends PageObject {

    page: Page;
    url: string;
    cardListData: { key: keyOptions, title: string, extension: string }[];
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

        this.url = QAPlaygroundMainURL;
        this.cardListData = QAPlaygroundOptions;

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
     * Navigates through each card
     * @returns 
     */
    async validateLinks() {
        // Initialize empty error string
        let errorString = '';

        // Iterate through all options
        for (const option of QAPlaygroundOptions) {
            // Navigate to main page
            await this.navigate();

            // Generation option locator, then select found locator
            let optionLocator = this.page.locator(`[href="${option.extension}"]`);
            await optionLocator.click();

            // Check URL and append error if validation fails
            let currentURL = await this.getCurrentURL();
            if (!currentURL.includes(option.extension)) {
                errorString += `error with link for ${option.key}:\n expected: ${option.extension}\n actual: ${currentURL}\n\n`;
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