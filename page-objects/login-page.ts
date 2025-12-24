import { $ } from '@wdio/globals';
import BasePage from './base-page';

class LoginPage extends BasePage {
    /** Page identifier */
    private static readonly PAGE_IDENTIFIER_SELECTOR = 'h1.page-title';
    private static readonly PAGE_IDENTIFIER_TEXT = 'Login';

    /** Selectors */
    private static readonly SELECTORS = {
        EMAIL: '#email',
        PASSWORD: '#password',
        SUBMIT_BUTTON: 'button[type="submit"]',
        FORGOT_PASSWORD: 'a#forgot-password',
    };

    constructor() {
        super(LoginPage.PAGE_IDENTIFIER_SELECTOR, LoginPage.PAGE_IDENTIFIER_TEXT);
    }

    /** Getters */
    public get inputEmail() {
        return $(LoginPage.SELECTORS.EMAIL);
    }

    public get inputPassword() {
        return $(LoginPage.SELECTORS.PASSWORD);
    }

    public get btnSubmit() {
        return $(LoginPage.SELECTORS.SUBMIT_BUTTON);
    }

    public get linkForgotPassword() {
        return $(LoginPage.SELECTORS.FORGOT_PASSWORD);
    }

    /** Actions */
    public async login(email: string, password: string) {
        await this.inputEmail.waitForDisplayed();
        await this.inputEmail.setValue(email);

        await this.inputPassword.waitForDisplayed();
        await this.inputPassword.setValue(password);

        await this.btnSubmit.waitForDisplayed();
        await this.btnSubmit.click();
    }

    public async clickForgotPassword() {
        await this.linkForgotPassword.waitForDisplayed();
        await this.linkForgotPassword.click();
    }
}

export default LoginPage;
