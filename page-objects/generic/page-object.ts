import { ElementHandle, Locator } from "@playwright/test";
import { type Page } from "@playwright/test";
import LocatorHelper from "../../utility/helpers/locator.helper";

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

    /**
     * Waits for any element with matching locator to be visble
     * - uses Page.waitForSelector(Locator._selector)
     * @param locator 
     */
    async waitForLocatorToBeVisible(locator: Locator, timeout: number = 5000) {
        await this.page.waitForSelector(LocatorHelper.getSelectorFromLocator(locator), { timeout: timeout })
    }
}