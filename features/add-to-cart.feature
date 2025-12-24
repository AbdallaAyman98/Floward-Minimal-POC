Feature: Add Item to Cart

  # This scenario tests adding items from different categories to the cart
  Scenario Outline: User adds an item to the cart
    Given the Floward app is launched
    And the user is logged in
    When the user navigates to the catalogue
    # User selects category from the examples table
    And the user selects category "<category>"
    # User selects specific item
    And the user selects item "<item>"
    Then the item "<item>" should be added to the cart

#  Examples:
#   | category    | item            |
#   | Flowers     | Red Roses       |
#   | Gifts       | Teddy Bear      |


