import { $ } from '@wdio/globals';
import BasePage from './base-page';
import HomePage from './home-page';
import { DIRECTION, swipeToElement } from '../utils/mobile-objects/android/obj-element-finder';

class WelcomePage extends BasePage {
    /** Page identifier */
    private static readonly PAGE_IDENTIFIER_SELECTOR =
        'android=new UiSelector().resourceId("com.q8.flowers.app:id/language_title")';
    private static readonly PAGE_IDENTIFIER_TEXT = 'Language';

    /** Selectors */
    private static readonly SELECTORS = {
        CITY_SELECTOR: '#city',
        LANG_ARABIC: 'button#lang-ar',
        LANG_ENGLISH: 'button#lang-en',
        CONTINUE_TO_BUTTON: 'android=new UiSelector().resourceId("com.q8.flowers.app:id/confirm_button")'
    };

    constructor() {
        super(
            WelcomePage.PAGE_IDENTIFIER_SELECTOR,
            WelcomePage.PAGE_IDENTIFIER_TEXT
        );
    }

    /** Getters */
    private get btnArabic() {
        return $(WelcomePage.SELECTORS.LANG_ARABIC);
    }

    private get btnEnglish() {
        return $(WelcomePage.SELECTORS.LANG_ENGLISH);
    }

    private get btnContinueTo() {
        return $(WelcomePage.SELECTORS.CONTINUE_TO_BUTTON);
    }

    /** Individual actions */

    /** Tap Continue button */
    public async continueTo(): Promise<this> {
        await this.btnContinueTo.waitForDisplayed();
        await this.btnContinueTo.tap();
        return this; // fluent
    }

    /** Select a country from horizontal list */
    public async selectCountry(country: string): Promise<this> {
        const containerSelector =
            'android=new UiSelector().resourceId("com.q8.flowers.app:id/country_selection_list")';
        const targetSelector = `android=new UiSelector().resourceId("com.q8.flowers.app:id/country_name").text("${country}")`;

        const countryElement = await swipeToElement(
            targetSelector,
            DIRECTION.HORIZONTAL,
            containerSelector
        );
        await countryElement.tap();
        return this; // fluent
    }

    /** Select a city from vertical list */
    public async selectCity(city: string): Promise<this> {
        const containerSelector =
            '//androidx.recyclerview.widget.RecyclerView[@resource-id="com.q8.flowers.app:id/city_selection_list"]';
        const targetSelector = `//android.widget.TextView[@resource-id="com.q8.flowers.app:id/city_name" and @text="${city}"]`;

        const cityElement = await swipeToElement(
            targetSelector,
            DIRECTION.VERTICAL,
            containerSelector
        );

        await cityElement.tap();
        return this; // fluent
    }

    /** Switch app language to Arabic */
    public async switchToArabic(): Promise<this> {
        await this.btnArabic.waitForDisplayed();
        await this.btnArabic.tap();
        return this;
    }

    /** Switch app language to English */
    public async switchToEnglish(): Promise<this> {
        await this.btnEnglish.waitForDisplayed();
        await this.btnEnglish.tap();
        return this;
    }

    /** Combined reusable helper: select location and continue to HomePage */
    public async selectLocationAndContinue(country: string, city: string): Promise<HomePage> {
        await this.selectCountry(country);
        await this.selectCity(city);
        await this.continueTo();
        return new HomePage();
    }
}

export default WelcomePage;
