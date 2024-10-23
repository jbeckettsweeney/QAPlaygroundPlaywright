import { ElementHandle, Locator } from "@playwright/test";
import { type Page } from "@playwright/test";

export default class PageObject {

    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Gets the current URL
     * @returns 
     */
    async getCurrentURL() {
        return this.page.url();
    }

    /**
     * Navigates to the input URL
     * @param url 
     */
    async navigateToURL(url: string) {
        await this.page.goto(url);
    }

    //
    async waitForLocatorToBeVisible(locator: Locator) {
        await this.page.waitForFunction(async () => {
            return await locator.isVisible();
        }, locator, { timeout: 10000 });
    }
}