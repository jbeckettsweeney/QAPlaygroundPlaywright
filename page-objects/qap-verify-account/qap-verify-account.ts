import { Locator, Page } from "@playwright/test";
import PageObject from "../generic/page-object";

export default class QAPVerifyAccount extends PageObject {

    page: Page;

    confirationCodeLocator: Locator;
    codeInputLocator: Locator;
    successLocator: Locator;


    /**
     * QA Playground Verify Account
     * - Verify Account page for QA Playground
     * - url: https://qaplayground.dev/apps/verify-account/
     * @param page 
     */
    constructor(page: Page) {
        super(page);
        this.page = page;

        this.confirationCodeLocator = this.page.locator('small[class="info"]');
        this.codeInputLocator = this.page.locator('input[class="code"]');
        this.successLocator = this.page.locator('small[class="info success"]');

    }

    /**
     * Waits for specified locators to be visible
     */
    async waitForLoad() {
        await this.waitForLocatorToBeVisible(this.confirationCodeLocator);
    }

    /**
     * Gets the confirmation code from the page
     * - returns only a six-digit string
     * @returns 
     */
    async getConfirmationCode() {
        let fullText = await this.confirationCodeLocator.innerHTML();
        let code = fullText.split('is ').pop()!;
        code = code.replaceAll('-', '');
        code = code.replaceAll(' ', '');
        return code;
    }

    /**
     * Submits the input six-digit string code
     * @param code 
     */
    async inputConfirmationCode(code: string) {
        // Reject bad code
        if (code.length !== 6) throw new Error('Confirmation code must be string of length 6');

        // Input each digit
        for (let i = 0; i < 6; i++) {
            // Generate nth locator
            let currentDigitLocator = this.codeInputLocator.nth(i);

            // Set digit
            await currentDigitLocator.fill(code[i]);
        }

        // Submit input
        await this.page.keyboard.press('Enter');
    }

    /**
     * Checks if the success message is visible
     * @returns 
     */
    async successDisplayed(expectSuccess: boolean = false) {
        if (expectSuccess) await this.waitForLocatorToBeVisible(this.successLocator);
        return await this.successLocator.isVisible();
    }

}