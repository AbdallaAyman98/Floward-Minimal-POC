import { $ } from '@wdio/globals';
import BasePage from './base-page';

class CataloguePage extends BasePage {
    /** Page identifier (unique element to assert page is loaded) */
    private static readonly PAGE_IDENTIFIER_SELECTOR =
        'android=new UiSelector().resourceId("com.q8.flowers.app:id/catalogue_title")';
    private static readonly PAGE_IDENTIFIER_TEXT = 'Catalogue';

    /** Page-specific selectors */
    private static readonly SELECTORS = {
        SEARCH_BAR: 'android=new UiSelector().resourceId("com.q8.flowers.app:id/search_bar")',
        CATEGORY_LIST: 'android=new UiSelector().resourceId("com.q8.flowers.app:id/category_list")',
        FIRST_ITEM: 'android=new UiSelector().resourceId("com.q8.flowers.app:id/item_0")'
    };

    constructor() {
        super(CataloguePage.PAGE_IDENTIFIER_SELECTOR, CataloguePage.PAGE_IDENTIFIER_TEXT);
    }

    /** Page elements */
    private get searchBar() {
        return $(CataloguePage.SELECTORS.SEARCH_BAR);
    }

    private get categoryList() {
        return $(CataloguePage.SELECTORS.CATEGORY_LIST);
    }

    private get firstItem() {
        return $(CataloguePage.SELECTORS.FIRST_ITEM);
    }

    /** Actions */

    /** Search for an item in the catalogue */
    public async searchItem(itemName: string): Promise<this> {
        await this.searchBar.waitForDisplayed();
        await this.searchBar.setValue(itemName);
        return this; // fluent
    }

    /** Select the first item in the catalogue */
    public async selectFirstItem(): Promise<this> {
        await this.firstItem.waitForClickable();
        await this.firstItem.click();
        return this; // fluent
    }

    /** Select a category by name */
    public async selectCategory(categoryName: string): Promise<this> {
        const categorySelector = `android=new UiSelector().text("${categoryName}")`;
        const category = $(categorySelector);
        await category.waitForClickable();
        await category.click();
        return this; // fluent
    }
}

export default CataloguePage;
