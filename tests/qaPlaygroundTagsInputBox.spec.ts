import { test, expect } from '@playwright/test';
import QAPlaygroundMain from '../page-objects/qa-playground-main/qa-playground-main';
import { QAPlaygroundOptions } from '../utility/data/qa-playground.data';
import QAPTagsInputBox from '../page-objects/qap-tags-input-box/qap-tags-input-box';

// Test data
const tagsInputBoxOption = QAPlaygroundOptions.tagsInputBox;
const expectedInitialTags = ['node', 'javascript'];
const extraTags = ['c3', 'd4', 'e5', 'f6', 'g7', 'h8', 'i9', 'j10'];
const expectedAllTags = expectedInitialTags.concat(extraTags);
const errorTag = 'error';

test('QA Playground Mini-App: Tags Input Box', async ({ page }) => {
    // Navigate to QA Playground's main page
    let qapMain = new QAPlaygroundMain(page);
    await qapMain.navigate();

    // Select the Tags Input Box option
    await qapMain.selectOptionByKey(tagsInputBoxOption.key);

    // Wait for page load
    let qapTagsInputBox = new QAPTagsInputBox(page);
    await qapTagsInputBox.waitForLoad();

    // Verify initial tags and count
    expect(await qapTagsInputBox.verifyTags(expectedInitialTags))
        .toBe(true);
    expect(await qapTagsInputBox.getCountOfTagsRemaining())
        .toBe(8);

    // Add remaining expected tags and attempt to add beyond limit
    await qapTagsInputBox.submitTags(extraTags);
    await qapTagsInputBox.submitTag(errorTag);

    // Verify full list and count, which should exclude extra tag
    expect(await qapTagsInputBox.verifyTags(expectedAllTags))
        .toBe(true);
    expect(await qapTagsInputBox.getCountOfTagsRemaining())
        .toBe(0);
    expect(await qapTagsInputBox.isTagPresent(errorTag))
        .toBe(false);

    // Remove initial tags
    await qapTagsInputBox.removeTags(expectedInitialTags);

    // Verify removal and count
    expect(await qapTagsInputBox.verifyTags(extraTags))
        .toBe(true);
    expect(await qapTagsInputBox.getCountOfTagsRemaining())
        .toBe(2);

    // Use button to remove all tags
    await qapTagsInputBox.removeAllTagsWithButton();

    // Verify zero tags and count
    expect(await qapTagsInputBox.verifyTags([]))
        .toBe(true);
    expect(await qapTagsInputBox.getCountOfTagsRemaining())
        .toBe(10);

});