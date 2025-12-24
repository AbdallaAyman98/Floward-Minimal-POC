import { Given, When, Then } from '@cucumber/cucumber';
import WelcomePage from '../page-objects/welcome-page.ts';
//import LoginPage from '../page-objects/login-page.ts';


Given('the Floward app is launched', async () => {
    const welcomePage = new WelcomePage();
    await welcomePage.assertPageIsDisplayed();
    (await (await welcomePage.selectLocationAndContinue('Egypt', 'Greater Cairo')));
    await browser.pause(5000); // optional small wait
});

When('the user navigates to the Login page', async () => {
    // await welcomePage.goToLogin();
});

When('the user enters email {string} and password {string}', async (email, password) => {
    // await loginPage.enterEmail(email);
    // await loginPage.enterPassword(password);
});

When('the user taps the Login button', async () => {
    // await loginPage.tapLogin();
});

Then('the user should be successfully logged in', async () => {
    // await loginPage.assertLoginSuccess();
});

Then('the user should see an error message {string} for invalid credentials', async (message) => {
    // await loginPage.assertLoginError(message);
});
