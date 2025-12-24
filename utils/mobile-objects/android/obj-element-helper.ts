export async function pulseElement(
    element: WebdriverIO.Element,
    duration = 300
) {
    const rect = await browser.getElementRect(await element.elementId);

    const x = Math.round(rect.x + rect.width / 2);
    const y = Math.round(rect.y + rect.height / 2);

    await browser.performActions([{
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
            { type: 'pointerMove', duration: 0, x, y },
            { type: 'pointerDown', button: 0 },
            { type: 'pause', duration },
            { type: 'pointerUp', button: 0 }
        ]
    }]);

    await browser.releaseActions();
}
