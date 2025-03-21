Feature: End to End Ecommerce Validation

    This is the description

    #    @Regression
    #    Scenario: Ecommerce products delivery
    #        Given I am on the ecommn practice login page
    #        When I login to the application
    #        And I add items to Cart and checkout
    #        And Validate the total price limit
    #        Then select the country submit and verify success message

    @Smoke
    #    Scenario Outline:  Ecommerce products delivery using data table
    #        Given I am on the ecommn practice login page
    #        When I login to the application portal
    #            | userName           | password |
    #            | rahulshettyacademy | learning |
    #        And I add items to Cart and checkout
    #        And Validate the total price limit
    #        Then select the country submit and verify success message

    Scenario Outline: Ecommerce change values on checkout page
        Given I am on the ecommn practice login page
        When I login to the application
        And I add the following items to Cart and checkout "<item1>", "<item2>", "<item3>"
        And I take note of sum of products
        And I change the quantity of each item to 3
        And I remove "<item3>"
        Then the the new sum of products should be "<new sum>" than the previous one
        Examples:
            | item1    | item2          | item3      | new sum |
            | iphone X | Samsung Note 8 | Blackberry | higher  |



