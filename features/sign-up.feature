Feature: Sign Up

  Scenario: User signs up with valid data
    Given the Floward app is launched
    When the user navigates to the Sign Up page
    And the user enters a valid username, email, and password
    And the user submits the sign up form
    Then the user should see a confirmation that the account was created
