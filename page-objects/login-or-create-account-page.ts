import { $ } from '@wdio/globals';
import BasePage from './base-page';
import LoginPage from './login-page';
import SignUpPage from './signup-page';


class LoginOrCreateAccountPage extends BasePage {
    // Define selector and page identifier text as static constants
    private static readonly PAGE_IDENTIFIER_SELECTOR = 'h1.page-title';
    private static readonly PAGE_IDENTIFIER_TEXT = 'Login or Create Account';

    private static readonly SELECTORS = {
        EMAIL: '#email',
        CONTINUE_BUTTON: 'button#continue',
    };

    public get inputEmail() {
        return $(LoginOrCreateAccountPage.SELECTORS.EMAIL);
    }

    public get btnContinue() {
        return $(LoginOrCreateAccountPage.SELECTORS.CONTINUE_BUTTON);
    }

    constructor() {
        // Pass the static selector and text to BasePage
        super(
            LoginOrCreateAccountPage.PAGE_IDENTIFIER_SELECTOR,
            LoginOrCreateAccountPage.PAGE_IDENTIFIER_TEXT
        );
    }

    /**
     * Continue with email and return next page based on the isEmailRegistered flag
     * @param email - email to enter
     * @param isEmailRegistered - boolean, true if email is registered, false otherwise
     * @returns LoginPage if valid, SignUpPage if not
     */
    public async continueWithEmail(email: string, isEmailRegistered: boolean): Promise<LoginPage | SignUpPage> {
        await this.inputEmail.waitForDisplayed();
        await this.inputEmail.setValue(email);

        await this.btnContinue.waitForClickable();
        await this.btnContinue.click();

        return isEmailRegistered ? new LoginPage() : new SignUpPage();
    }
}

export default LoginOrCreateAccountPage;
