import { test, expect } from '@playwright/test';
import QAPlaygroundMain from '../../page-objects/qa-playground-main/qa-playground-main';
import QAPDynamicTable from '../../page-objects/qap-dynamic-table/qap-dynamic-table';
import { QAPlaygroundOptions } from '../../utility/data/qa-playground.data';

const dynamicTableOption = QAPlaygroundOptions.dynamicTable;

test.describe('QA Playground Mini-App: Dynamic Table', async () => {

    test('Navigation to Dynamic Table', async ({ page }) => {
        // Navigate to QA Playground's main page
        let qapMain = new QAPlaygroundMain(page);
        await qapMain.navigate();
    
        // Select the Dynamic Table option
        await qapMain.selectOptionByKey(dynamicTableOption.key);
    
        // Verify arrival at Dynamic Table page
        expect((await qapMain.getCurrentURL()).includes(dynamicTableOption.extension))
            .toBe(true);
    });
    
    test('Number of rows', async ({ page }) => {
        let qapDynamicTable = new QAPDynamicTable(page);
        console.warn(await qapDynamicTable.isDisplayed());
        await qapDynamicTable.waitForLocatorToBeVisible(qapDynamicTable.rowLocator);
        console.warn(await qapDynamicTable.isDisplayed());

        expect(await qapDynamicTable.getNumberOfRows())
            .toBe(8);
    });

});