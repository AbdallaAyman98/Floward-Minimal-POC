import { $ } from '@wdio/globals';
import BasePage from './base-page';
import LoginOrCreateAccountPage from './login-or-create-account-page';

class MyAccountPage extends BasePage {
    /** Page identifier for BasePage */
    private static readonly PAGE_IDENTIFIER_SELECTOR =
        'android=new UiSelector().resourceId("com.q8.flowers.app:id/titleTV")';
    private static readonly PAGE_IDENTIFIER_TEXT = 'Profile';

    /** Selectors for page elements */
    private static readonly SELECTORS = {
        SIGN_IN_OR_CREATE_BUTTON: 'android=new UiSelector().resourceId("com.q8.flowers.app:id/sign_in_button-in")',
        CUSTOMER_CARE: 'a#customer-care',
        LANGUAGES: 'select#language',
        FAQ: 'a#faq',
        TERMS_AND_CONDITIONS: 'a#terms',
        PRIVACY_POLICY: 'a#privacy',
    };

    constructor() {
        // Pass page identifier selector & text to BasePage
        super(MyAccountPage.PAGE_IDENTIFIER_SELECTOR, MyAccountPage.PAGE_IDENTIFIER_TEXT);
    }

    /** Getters */
    public get btnSignIn() {
        return $(MyAccountPage.SELECTORS.SIGN_IN_OR_CREATE_BUTTON);
    }

    public get linkCustomerCare() {
        return $(MyAccountPage.SELECTORS.CUSTOMER_CARE);
    }

    public get dropdownLanguages() {
        return $(MyAccountPage.SELECTORS.LANGUAGES);
    }

    public get linkFAQ() {
        return $(MyAccountPage.SELECTORS.FAQ);
    }

    public get linkTermsAndConditions() {
        return $(MyAccountPage.SELECTORS.TERMS_AND_CONDITIONS);
    }

    public get linkPrivacyPolicy() {
        return $(MyAccountPage.SELECTORS.PRIVACY_POLICY);
    }

    /** Actions */

    /** Tap on Sign In / Create Account button */
    public async tapSignInOrCreateAccount(): Promise<LoginOrCreateAccountPage> {
        await this.btnSignIn.waitForDisplayed();
        await this.btnSignIn.tap();
        return new LoginOrCreateAccountPage();
    }

    /** Select language from dropdown */
    public async selectLanguage(language: string) {
        await this.dropdownLanguages.waitForDisplayed();
        await this.dropdownLanguages.selectByVisibleText(language);
    }

    /** Open Customer Care page / section */
    public async openCustomerCare() {
        await this.linkCustomerCare.waitForDisplayed();
        await this.linkCustomerCare.tap();
    }

    /** Open FAQ page / section */
    public async openFAQ() {
        await this.linkFAQ.waitForDisplayed();
        await this.linkFAQ.tap();
    }

    /** Open Terms and Conditions page */
    public async openTermsAndConditions() {
        await this.linkTermsAndConditions.waitForDisplayed();
        await this.linkTermsAndConditions.tap();
    }

    /** Open Privacy Policy page */
    public async openPrivacyPolicy() {
        await this.linkPrivacyPolicy.waitForDisplayed();
        await this.linkPrivacyPolicy.tap();
    }
}

export default MyAccountPage;
