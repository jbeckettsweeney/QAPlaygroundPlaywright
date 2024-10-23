import { Locator, Page } from "@playwright/test";
import PageObject from "../generic/page-object";
import { QAPlaygroundMainURL, QAPlaygroundOptionModel, QAPlaygroundOptions } from "../../utility/data/qa-playground.data";

export default class QAPDynamicTable extends PageObject {

    page: Page;
    option: QAPlaygroundOptionModel;
    url: string;
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

        this.rowLocator = this.page.locator('tbody');
    }

    //
    async isDisplayed() {
        return await this.rowLocator.isVisible();
    }

    //
    async getNumberOfRows() {
        return (await this.rowLocator.all()).length;
    }
}