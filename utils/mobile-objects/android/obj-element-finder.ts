import { $, browser } from '@wdio/globals';

export enum SWIPES { VERY_LOW = 1, LOW = 2, MIN = 3, MEDIUM = 5, HIGH = 7, MAX = 10, ULTRA = 30 }
export enum SWIPE_DURATION { ULTRA_SONIC = 50, FAST = 100, SONIC = 200, SMOOTH = 500, SLOW = 800, VERY_SLOW = 1200, TURBO = 1500 }
export enum DIRECTION { VERTICAL = 'V', HORIZONTAL = 'H' }
export enum PAUSE { ULTRA_SHORT = 50, SHORT = 300, MEDIUM = 500, LONG = 800, VERY_LONG = 1200, EXTRA_LONG = 2000 }
export enum SWIPE_DISTANCE { VERY_SHORT = 0.05, SHORT = 0.1, MEDIUM = 0.2, LONG = 0.3, VERY_LONG = 0.5, FULL = 0.9 }

/**
 * Swipe incrementally until element is visible, tries both directions.
 */
export async function swipeToElement(
    targetSelector: string,
    direction: DIRECTION = DIRECTION.VERTICAL,
    containerSelector?: string,
    maxSwipes: SWIPES = SWIPES.ULTRA,
    swipeDuration: SWIPE_DURATION = SWIPE_DURATION.FAST,
    pauseDuration: PAUSE = PAUSE.ULTRA_SHORT,
    distance: SWIPE_DISTANCE = SWIPE_DISTANCE.SHORT
): Promise<ReturnType<typeof $>> {

    const { width, height } = await browser.getWindowSize();

    // Detect container if provided
    let container;
    if (containerSelector) {
        container = await $(containerSelector);
        if (!(await container.isExisting())) container = undefined;
    }

    // Primary then opposite direction
    const swipeDirections = ['primary', 'opposite'] as const;

    for (const dir of swipeDirections) {
        for (let i = 0; i < maxSwipes; i++) {
            const element = await $(targetSelector);
            if (await element.isExisting() && await element.isDisplayed()) return element;

            const rect = container
                ? await browser.getElementRect(await container.elementId)
                : { x: 0, y: 0, width, height };

            // Small incremental swipe
            const increment = (direction === DIRECTION.VERTICAL ? rect.height : rect.width) * distance;

            let startX: number, startY: number, endX: number, endY: number;

            if (direction === DIRECTION.VERTICAL) {
                startX = rect.x + rect.width / 2;
                startY = rect.y + rect.height / 2;
                endX = startX;
                endY = dir === 'opposite' ? startY + increment : startY - increment;
            } else { // HORIZONTAL
                startY = rect.y + rect.height / 2;
                startX = rect.x + rect.width / 2;
                endY = startY;
                endX = dir === 'opposite' ? startX + increment : startX - increment;
            }

            // Perform smooth, slow incremental swipe
            await browser.performActions([{
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: Math.round(startX), y: Math.round(startY) },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pointerMove', duration: swipeDuration, x: Math.round(endX), y: Math.round(endY) },
                    { type: 'pointerUp', button: 0 }
                ]
            }]);

            await browser.releaseActions();
            await browser.pause(pauseDuration);
        }
    }

    throw new Error(`Element "${targetSelector}" not found after both directions and ${maxSwipes} swipes`);
}
