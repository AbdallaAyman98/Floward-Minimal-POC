import { Given, When, Then } from '@cucumber/cucumber';
import WelcomePage from '../page-objects/welcome-page';
import SignUpPage from '../page-objects/signup-page';

const welcomePage = new WelcomePage();
const signUpPage = new SignUpPage();


When('the user navigates to the Sign Up page', async () => {
    // await welcomePage.goToSignUp();
});

When('the user enters a valid username, email, and password', async () => {
    // await signUpPage.continueSignUp('TestUser', 'Password123');
});

When('the user submits the sign up form', async () => {
    // await signUpPage.submit();
});

Then('the user should see a confirmation that the account was created', async () => {
    // await signUpPage.assertSignUpSuccess();
});
