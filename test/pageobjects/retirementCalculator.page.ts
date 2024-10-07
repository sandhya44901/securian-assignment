import { $ } from '@wdio/globals'
import Page from './page.js';


class RetirementCalculatorPage extends Page{

    get currentAgeInput() { return $('#current-age'); }
    get retirementAgeInput() { return $('#retirement-age'); }
    get annualIncomeInput() { return $('#current-income'); }
    get spouseIncomeInput() { return $('#spouse-income'); }
    get retirementSavingsInput() { return $('#current-total-savings'); }
    get retirementContributionInput() { return $('#current-annual-savings'); }
    get retirementIncreaseInput() { return $('#savings-increase-rate'); }
    get socialSecurityYes() { return $('#yes-social-benefits'); }
    get socialSecurityOverrideInput() { return $('#social-security-override'); }
    get submitButton() { return $('button[data-tag-id=submit]'); }
    get successMessage() { return $('#result-message'); }
    get maritalStatusLabel() { return $('#marital-status-label'); }

    async fillForm(data: any) {
        await this.currentAgeInput.setValue(data.currentAge);
        await this.retirementAgeInput.setValue(data.retirementAge);
        await browser.execute('arguments[0].value='+data.currentAnnualIncome+';', await this.annualIncomeInput);
        await browser.execute('arguments[0].value='+data.spouseAnnualIncome+';', await this.spouseIncomeInput);
        await browser.execute('arguments[0].value='+data.currentRetirementSavings+';', await this.retirementSavingsInput);
        await this.retirementContributionInput.setValue(data.retirementContribution);
        await this.retirementIncreaseInput.setValue(data.retirementContributionIncrease);
        if (data.socialSecurity === 'Yes') {
            await browser.execute('arguments[0].click();', await this.socialSecurityYes);
            await browser.execute('arguments[0].value='+data.socialSecurityOverride+';', await this.socialSecurityOverrideInput);
        }
    }

    async fillMandatoryForm(data: any) {
        await this.currentAgeInput.setValue(data.currentAge);
        await this.retirementAgeInput.setValue(data.retirementAge);
        await browser.execute('arguments[0].value='+data.currentAnnualIncome+';', await this.annualIncomeInput);
        await browser.execute('arguments[0].value='+data.currentRetirementSavings+';', await this.retirementSavingsInput);
        await this.retirementContributionInput.setValue(data.retirementContribution);
        await this.retirementIncreaseInput.setValue(data.retirementContributionIncrease);
        if (data.socialSecurity === 'Yes') {
            await browser.execute('arguments[0].click();', await this.socialSecurityYes);
            await browser.execute('arguments[0].value='+data.socialSecurityOverride+';', await this.socialSecurityOverrideInput);
        }
    }

    async submitForm() {
        await this.submitButton.click();
    }

    async getSuccessMessageTextAfterWait() {
        await browser.pause(10000);
        const messageText = await this.successMessage.getText();
        return messageText;
    }

    aync isMaritalStatusVisible(){
        const status = await maritalStatusLabel.isDisplayed();
        return status;

    }

}

export default new RetirementCalculatorPage();
