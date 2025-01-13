import { test, expect } from '@playwright/test';
import QAPlaygroundMain from '../../page-objects/qa-playground-main/qa-playground-main';

test('Navigation for QA Playground', async ({ page }) => {
    // Navigate to QA Playground's main page
    let main = new QAPlaygroundMain(page);
    await main.navigate();

    // Traverse and validate all links
    expect(await main.validateLinks())
        .toBe('');
});