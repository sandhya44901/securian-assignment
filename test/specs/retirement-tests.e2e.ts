import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'
import RetirementCalculatorPage from '../pageobjects/retirementCalculator.page.ts'

describe('My Login application', () => {

    const testData = {
        currentAge: 40,
        retirementAge: 68,
        currentAnnualIncome: 100000,
        spouseAnnualIncome: 75000,
        currentRetirementSavings: 500000,
        retirementContribution: 10,
        retirementContributionIncrease: 0.25,
        socialSecurity: 'Yes',
        socialSecurityOverride: 4000,
        otherIncome: 500
    };

    beforeEach(async () => {
        await RetirementCalculatorPage.open();
    });

    it('should submit form with all fields filled', async () => {
        await RetirementCalculatorPage.fillForm(testData);
        await RetirementCalculatorPage.submitForm();
        const successMessage = await RetirementCalculatorPage.getSuccessMessageTextAfterWait();
        await expect(successMessage).toEqual('Congratulations! You are exceeding your retirement goals. You are saving an extra $833 a month.');
    });

    it('should submit form with all mandatory fields filled', async () => {
        await RetirementCalculatorPage.fillMandatoryForm(testData);
        await RetirementCalculatorPage.submitForm();
        const successMessage = await RetirementCalculatorPage.getSuccessMessageTextAfterWait();
        await expect(successMessage).toEqual('Congratulations! You are exceeding your retirement goals. You are saving an extra $833 a month.');
    });

    it('should able to view marital status when Social security mark as yes', async () => {
        await RetirementCalculatorPage.fillMandatoryForm(testData);
        const maritalStatus  = await RetirementCalculatorPage.isMaritalStatusVisible();
        await expect(maritalStatus).toEqual(true);
    });

})

