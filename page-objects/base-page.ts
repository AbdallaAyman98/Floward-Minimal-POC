import { $, browser, expect } from '@wdio/globals';

/** Retry durations in milliseconds */
export enum RetryDelay {
    FAST = 500,
    MEDIUM = 2000,
    SLOW = 5000,
    LONG = 10000
}

/** Retry count constants */
export enum RetryCount {
    MIN = 2,
    MEDIUM = 5,
    MAX = 10
}

type PageConstructor = new () => any;

export default abstract class BasePage {
    /** Navigation bar selectors shared across all pages */
    protected static readonly NAV_SELECTORS: Record<string, string> = {
        cart: '~cart_icon',
        myaccount: '~profile_icon',
        home: '~home_icon',
        catalogue: '~catalogue_icon'
    };

    protected constructor(
        protected readonly pageIdentifierSelector?: string,
        protected readonly pageIdentifierText?: string
    ) {}

    protected get pageIdentifier() {
        return $(this.pageIdentifierSelector!);
    }

    /** Assert page is displayed */
    public async assertPageIsDisplayed(
        maxRetries = RetryCount.MEDIUM,
        retryDelay = RetryDelay.MEDIUM
    ): Promise<this> {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const element = this.pageIdentifier;
                await element.waitForDisplayed({ timeout: retryDelay });

                if (this.pageIdentifierText) {
                    const text = await element.getText();
                    expect(text).toBe(this.pageIdentifierText);
                }

                return this;
            } catch (err) {
                if (attempt === maxRetries) throw err;
                await browser.pause(retryDelay);
            }
        }
        return this;
    }

    /**
     * Navigate to a top-level section (cart, catalogue, home, myaccount)
     * Returns the corresponding page instance for fluent chaining
     */
    public async navigateTo(section: string): Promise<BasePage> {
        const key = section.toLowerCase();
        const selector = BasePage.NAV_SELECTORS[key];
        if (!selector) throw new Error(`Unknown section: ${section}`);

        const element = await $(selector);
        await element.waitForDisplayed({ timeout: 5000 });
        await element.tap();

        // Lazy import the page class to avoid circular dependency
        switch (key) {
            case 'cart': {
                const { default: CartPage } = await import('./cart-page');
                return new CartPage();
            }
            case 'myaccount': {
                const { default: MyAccountPage } = await import('./my-account-page');
                return new MyAccountPage();
            }
            case 'home': {
                const { default: HomePage } = await import('./home-page');
                return new HomePage();
            }
            case 'catalogue': {
                const { default: CataloguePage } = await import('./catalogue-page');
                return new CataloguePage();
            }
            default:
                throw new Error(`No page mapped for section: ${section}`);
        }
    }
}
