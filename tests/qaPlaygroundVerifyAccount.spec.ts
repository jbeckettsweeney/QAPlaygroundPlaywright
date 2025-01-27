import { test, expect } from '@playwright/test';
import QAPlaygroundMain from '../page-objects/qa-playground-main/qa-playground-main';
import { QAPlaygroundOptions } from '../utility/data/qa-playground.data';
import QAPVerifyAccount from '../page-objects/qap-verify-account/qap-verify-account';

// Test data
const verifyYourAccountOption = QAPlaygroundOptions.verifyYourAccount;

test('QA Playground Mini-App: Verify Your Account', async ({ page }) => {
    // Navigate to QA Playground's main page
    let qapMain = new QAPlaygroundMain(page);
    await qapMain.navigate();

    // Select the Verify Your Account option
    await qapMain.selectOptionByKey(verifyYourAccountOption.key);

    // Wait for page load
    let qapVerifyAccount = new QAPVerifyAccount(page);
    await qapVerifyAccount.waitForLoad();

    // Get confirmation code
    let confirmationCode = await qapVerifyAccount.getConfirmationCode();

    // Input confirmation code
    await qapVerifyAccount.inputConfirmationCode(confirmationCode);

    // Verify input
    expect(await qapVerifyAccount.successDisplayed(true))
        .toBe(true);

});