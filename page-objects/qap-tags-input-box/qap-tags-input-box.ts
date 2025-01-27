import { Locator, Page } from "@playwright/test";
import PageObject from "../generic/page-object";
import CompareHelper from "../../utility/helpers/compare.helper";

export default class QAPTagsInputBox extends PageObject {

    page: Page;

    tagIconLocator: Locator;
    genericTagLocator: Locator;
    inputLocator: Locator;
    detailsBoxLocator: Locator;
    tagsRemainingLocator: Locator;
    removeAllButtonLocator: Locator;


    /**
     * QA Playground Tags Input Box
     * - Tags Input Box page for QA Playground
     * - url: https://qaplayground.dev/apps/tags-input-box/
     * @param page 
     */
    constructor(page: Page) {
        super(page);
        this.page = page;

        this.tagIconLocator = this.page.locator('img[src="tag.svg"]');
        this.genericTagLocator = this.page.locator('ul').locator('li');
        this.inputLocator = this.page.locator('input[type="text"]');
        this.detailsBoxLocator = this.page.locator('div[class="details"]');
        this.tagsRemainingLocator = this.detailsBoxLocator.locator('p');
        this.removeAllButtonLocator = this.detailsBoxLocator.locator('button');

    }

    /**
     * Waits for specified locators to be visible
     */
    async waitForLoad() {
        await this.waitForLocatorToBeVisible(this.tagIconLocator);
    }

    /**
     * Gets the number of tags remaining from the tags remaining label
     * @returns 
     */
    async getCountOfTagsRemaining() {
        let line = await this.tagsRemainingLocator.innerText();
        line = line.split(' ')[0];
        return parseInt(line);
    }

    /**
     * Clicks the Remove All button
     */
    async removeAllTagsWithButton() {
        await this.removeAllButtonLocator.click();
    }

    /**
     * Gets all tags as a list of Tags based on the number of locators found
     * @returns 
     */
    async getAllTags() {
        let tags: Tag[] = [];
        let tagLocatorCount = await this.genericTagLocator.count();
        for (let i = 0; i < tagLocatorCount; i++) {
            tags.push(new Tag(this.page, this.genericTagLocator.nth(i)));
        }
        return tags;
    }

    /**
     * Gets a list of names for all current tags
     * @returns 
     */
    async getTagNames() {
        let tagNames: string[] = [];
        let tags = await this.getAllTags();
        for (const tag of tags) {
            tagNames.push(await tag.getText());
        }
        return tagNames;
    }

    /**
     * Checks if the input tag name is included in the full list of tag names
     * @param tagName 
     * @returns 
     */
    async isTagPresent(tagName) {
        let tagNames = await this.getTagNames();
        return tagNames.includes(tagName);
    }

    /**
     * Compares input expected tag names against actual tag names
     * @param expectedTags 
     * @returns 
     */
    async verifyTags(expectedTags: string[]) {
        let actualTags = await this.getTagNames();
        return CompareHelper.compareJSON(expectedTags, actualTags);
    }

    /**
     * Types input parameter tag into the input locator then clicks enter
     * @param tagText 
     */
    async submitTag(tagText: string) {
        await this.inputLocator.fill(tagText);
        await this.page.keyboard.press('Enter');
    }

    /**
     * Sequentially submits string list of tag names
     * @param tagTextList 
     */
    async submitTags(tagTextList: string[]) {
        for (const text of tagTextList) {
            await this.submitTag(text);
        }
    }

    /**
     * Sequentially checks tag names, removing the first matching tag and returning true
     * - returns false if no matching tag is found
     * @param tagName 
     * @returns 
     */
    async removeTag(tagName: string) {
        let tags = await this.getAllTags();
        for (const tag of tags) {
            if (await tag.getText() == tagName) {
                await tag.remove();
                return true;
            }
        }
        return false;
    }

    /**
     * Removes first matching tag for each input tag name
     * @param tagNames 
     */
    async removeTags(tagNames: string[]) {
        for (const name of tagNames) {
            await this.removeTag(name);
        }
    }

}

class Tag extends PageObject {

    page: Page;
    parentLocator: Locator;
    xButtonLocator: Locator;

    /**
     * Private class for individual tags
     * @param page 
     * @param parentLocator 
     */
    constructor(page: Page, parentLocator: Locator) {
        super(page);
        this.page = page;
        this.parentLocator = parentLocator;

        this.xButtonLocator = this.parentLocator.locator('i');
    }

    /**
     * Gets the text from this tag
     * @returns 
     */
    async getText() {
        return await this.parentLocator.innerText();
    }

    /**
     * Clicks this tag's x button to remove it
     */
    async remove() {
        await this.xButtonLocator.click();
    }
}