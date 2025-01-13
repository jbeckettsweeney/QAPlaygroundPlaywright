import { Locator, Page } from "@playwright/test";
import PageObject from "../generic/page-object";
import { QAPlaygroundMainURL, QAPlaygroundOptionModel, QAPlaygroundOptions } from "../../utility/data/qa-playground.data";

export default class QAPDynamicTable extends PageObject {

    page: Page;
    option: QAPlaygroundOptionModel;
    url: string;

    superheroHeaderLocator: Locator;
    bodyLocator: Locator;
    rowLocator: Locator;

    heroNameSelector: string;
    realNameSelector: string;
    emailSelector: string;
    
    /**
     * QA Playground Dynamic Table
     * - Dynamic Table page for QA Playground
     * - url: https://qaplayground.dev/apps/dynamic-table/
     * @param page 
     */
    constructor(page: Page) {
        super(page);
        this.page = page;
        this.option = QAPlaygroundOptions.dynamicTable;
        this.url = `${QAPlaygroundMainURL}${this.option.extension}`;

        this.superheroHeaderLocator = this.page.getByText('Superhero');

        this.bodyLocator = this.page.locator('[id="tbody"]');
        this.rowLocator = this.bodyLocator.locator('tr');

        this.heroNameSelector = 'div[class="text-sm font-medium text-white-900"]';
        this.realNameSelector = 'span[class="text-sm font-medium text-white-900"]';
        this.emailSelector = 'div[class="text-sm text-gray-500"]';
    }

    /**
     * Waits for specified locators to be visible
     */
    async waitForLoad() {
        await this.waitForLocatorToBeVisible(this.superheroHeaderLocator);
        await this.waitForLocatorToBeVisible(this.rowLocator);
    }

    /**
     * Gets number of superhero rows
     * @returns 
     */
    async getNumberOfRows() {
        return (await this.rowLocator.all()).length;
    }

    /**
     * Gets the data object for the input nth row
     * - value must be between 0 and 7 inclusive
     * @param n zero-indexed
     * @returns 
     */
    async getDataForNthRow(n: number) {
        // Generate nth locator
        let mainLocator = this.rowLocator.nth(n);
        
        // Get data for each locator
        let data = {
            heroName: await mainLocator.locator(this.heroNameSelector).innerText(),
            realName: await mainLocator.locator(this.realNameSelector).innerText(),
            email: await mainLocator.locator(this.emailSelector).innerText()
        }

        // Return data object
        return data
    }

    /**
     * Gets list of data objects for each row
     */
    async getDataForAllRows() {
        // Initialize list
        let dataList: {
            heroName: string,
            realName: string,
            email: string
        }[] = []

        // Establish total number of rows
        let length = await this.getNumberOfRows();

        // Acquire and append each row's data to list
        for (let i = 0; i < length; i++) {
            let data = await this.getDataForNthRow(i);
            dataList.push(data);
        }

        // Return collected data
        return dataList;
    }
}