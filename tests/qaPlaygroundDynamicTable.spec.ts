import { test, expect } from '@playwright/test';
import QAPlaygroundMain from '../../page-objects/qa-playground-main/qa-playground-main';
import QAPDynamicTable from '../../page-objects/qap-dynamic-table/qap-dynamic-table';
import { QAPlaygroundOptions } from '../../utility/data/qa-playground.data';
import CompareHelper from '../../utility/helpers/compare.helper';

// Test data
const dynamicTableOption = QAPlaygroundOptions.dynamicTable;
const superheroData = [
    { heroName: 'Ant-Man', realName: 'Eric O\'Grady', email: 'ant-man@avengers.com' },
    { heroName: 'Black Widow', realName: 'Natasha Alianovna Romanova', email: 'black-widow@avengers.com' },
    { heroName: 'Captain America', realName: 'Steve Rogers', email: 'captain-america@avengers.com' },
    { heroName: 'Deadpool', realName: 'Wade Wilson', email: 'deadpool@avengers.com' },
    { heroName: 'Doctor Strange', realName: 'Stephen Vincent Strange', email: 'doctor-strange@avengers.com' },
    { heroName: 'Hulk', realName: 'Robert Bruce Banner', email: 'hulk@avengers.com' },
    { heroName: 'Iron Man', realName: 'Anthony \'Tony\' Stark', email: 'iron-man@avengers.com' },
    { heroName: 'Spider-Man', realName: 'Peter Parker', email: 'spider-man@avengers.com' },
];

test('QA Playground Mini-App: Dynamic Table', async ({ page }) => {

    // Navigate to QA Playground's main page
    let qapMain = new QAPlaygroundMain(page);
    await qapMain.navigate();

    // Select the Dynamic Table option
    await qapMain.selectOptionByKey(dynamicTableOption.key);

    // Wait for page load
    let qapDynamicTable = new QAPDynamicTable(page);
    await qapDynamicTable.waitForLoad();

    // Check for number of rows
    expect(await qapDynamicTable.getNumberOfRows())
        .toBe(8);

    // Check that all data is accounted for
    let actualData = await qapDynamicTable.getDataForAllRows();
    expect(CompareHelper.compareJSON(superheroData, actualData, ['heroName']))
        .toBe(true);
        
});