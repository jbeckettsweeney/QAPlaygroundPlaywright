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
}