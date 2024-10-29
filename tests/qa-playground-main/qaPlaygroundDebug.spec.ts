import { test, expect } from '@playwright/test';
import { QAPlaygroundMainURL } from '../../utility/data/qa-playground.data';
import QAPlaygroundMain from '../../page-objects/qa-playground-main/qa-playground-main';


const qaplaygroundURL = QAPlaygroundMainURL;

test('debug test', async ({ page }) => {
    expect(true).toBe(true);
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