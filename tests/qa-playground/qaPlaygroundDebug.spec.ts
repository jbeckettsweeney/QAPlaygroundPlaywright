import { test, expect } from '@playwright/test';
import QAPlaygroundMain from '../../page-objects/qa-playground/qa-playground-main';
import { QAPlaygroundMainURL } from '../../page-objects/qa-playground/qa-playground.constants';

const qaplaygroundURL = QAPlaygroundMainURL;

test('debug test', async ({ page }) => {
    /*
    // Navigate to qaplayground's main page
    await page.goto(qaplaygroundURL);

    // Get main page title
    let title = page.getByText('QA Playground');
    console.warn(await title.isVisible());
    await expect(title).toBeVisible();

    let main = new QAPlaygroundMain(page);
    await main.printAllTitles();
    await main.printAllURLs();
    */
});