import { $ } from '@wdio/globals';
import BasePage from './base-page';

class CartPage extends BasePage {
    /** Page identifier */
    private static readonly PAGE_IDENTIFIER_SELECTOR =
        'android=new UiSelector().resourceId("com.q8.flowers.app:id/cart_screen")';
    private static readonly PAGE_IDENTIFIER_TEXT = 'Cart';

    /** Selectors for elements in Cart */
    private static readonly SELECTORS = {
        CART_ITEM_LIST: 'android=new UiSelector().resourceId("com.q8.flowers.app:id/cart_item_list")',
        CHECKOUT_BUTTON: 'android=new UiSelector().resourceId("com.q8.flowers.app:id/checkout_button")',
        TOTAL_PRICE: 'android=new UiSelector().resourceId("com.q8.flowers.app:id/total_price")',
        REMOVE_ITEM_BUTTON: 'android=new UiSelector().resourceId("com.q8.flowers.app:id/remove_item_button")',
    };

    constructor() {
        super(CartPage.PAGE_IDENTIFIER_SELECTOR, CartPage.PAGE_IDENTIFIER_TEXT);
    }

    /** Elements */
    private get cartItemList() {
        return $(CartPage.SELECTORS.CART_ITEM_LIST);
    }

    private get checkoutButton() {
        return $(CartPage.SELECTORS.CHECKOUT_BUTTON);
    }

    private get totalPrice() {
        return $(CartPage.SELECTORS.TOTAL_PRICE);
    }

    private get removeItemButton() {
        return $(CartPage.SELECTORS.REMOVE_ITEM_BUTTON);
    }

    /** Actions */

    /** Get total price displayed in cart */
    public async getTotalPrice(): Promise<string> {
        await this.totalPrice.waitForDisplayed({ timeout: 5000 });
        return await this.totalPrice.getText();
    }

    /** Remove an item from the cart */
    public async removeItem(): Promise<this> {
        await this.removeItemButton.waitForClickable({ timeout: 5000 });
        await this.removeItemButton.click();
        return this; // fluent
    }

    /** Proceed to checkout */
    public async proceedToCheckout(): Promise<this> {
        await this.checkoutButton.waitForClickable({ timeout: 5000 });
        await this.checkoutButton.click();
        return this; // fluent
    }

    /** Verify if cart has items */
    public async hasItems(): Promise<boolean> {
        return await this.cartItemList.isExisting();
    }
}

export default CartPage;
