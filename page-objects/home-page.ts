import BasePage from './base-page';

class HomePage extends BasePage {
    private static readonly PAGE_IDENTIFIER_SELECTOR =
        'android=new UiSelector().resourceId("com.q8.flowers.app:id/navigation_bar_item_large_label_view")';
    private static readonly PAGE_IDENTIFIER_TEXT = 'HOME';

    private static readonly SELECTORS = {
        CLOSE_POPUP_BUTTON: 'android=new UiSelector().resourceId("com.q8.flowers.app:id/close_button")'
    };

    constructor() {
        super(HomePage.PAGE_IDENTIFIER_SELECTOR, HomePage.PAGE_IDENTIFIER_TEXT);
    }

    private get closePopupButton() {
        return $(HomePage.SELECTORS.CLOSE_POPUP_BUTTON);
    }

    /** HomePage-specific action */
    public async closePopup(): Promise<this> {
        if (await this.closePopupButton.isExisting()) {
            await this.closePopupButton.tap();
        }
        return this; // fluent
    }
}

export default HomePage;
