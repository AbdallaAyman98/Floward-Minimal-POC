import { $ } from '@wdio/globals';
import BasePage from './base-page';

class SignUpPage extends BasePage {
    /** Page identifier */
    private static readonly PAGE_IDENTIFIER_SELECTOR = 'h1.page-title';
    private static readonly PAGE_IDENTIFIER_TEXT = 'Create Account';

    /** Selectors */
    private static readonly SELECTORS = {
        FULL_NAME: '#fullName',
        PASSWORD: '#password',
        CONTINUE_BUTTON: 'button#continue',
    };

    constructor() {
        super(SignUpPage.PAGE_IDENTIFIER_SELECTOR, SignUpPage.PAGE_IDENTIFIER_TEXT);
    }

    /** Getters */
    public get inputFullName() {
        return $(SignUpPage.SELECTORS.FULL_NAME);
    }

    public get inputPassword() {
        return $(SignUpPage.SELECTORS.PASSWORD);
    }

    public get btnContinue() {
        return $(SignUpPage.SELECTORS.CONTINUE_BUTTON);
    }

    /** Actions */
    public async continueSignUp(fullName: string, password: string) {
        await this.inputFullName.waitForDisplayed();
        await this.inputFullName.setValue(fullName);

        await this.inputPassword.waitForDisplayed();
        await this.inputPassword.setValue(password);

        await this.btnContinue.waitForClickable();
        await this.btnContinue.click();
    }
}

export default SignUpPage;
