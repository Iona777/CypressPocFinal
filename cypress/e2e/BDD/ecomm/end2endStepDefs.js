const { Given, When, Then, DataTable, Before } = require("@badeball/cypress-cucumber-preprocessor");

Given(`I am on the ecommn practice login page`, () => {

    const loginPageURL = 'https://rahulshettyacademy.com/loginpagePractise/#'
    const productName = "Nokia Edge"

    cy.visit(loginPageURL)


    //Set locators that can be found on entering the page
    cy.get('#username').as('userName')
    cy.get('#password').as('password')

    //Enter credentials
    cy.get('@userName').type('rahulshettyacademy')
    cy.get('@password').type('learning')

    //Can use contains() to get element that contains the given visible text
    cy.contains('Sign In').click()
    cy.contains("Shop Name").should('be.visible')



    //Product page
    cy.get('app-card').should('have.length',4)

    //filter() will return only those elements that match the given filter expression. This is easier to write then loop seen earlier
    //:contains() is a JQyuery command and needs to be proceeded by :
    //cy.get('app-card').filter(':contains("Nokia Edge")').then(function(element)

    //To use a paramter tin the contains() command, you need to use "${parameterName}" .
    // You also need to wrap the whole expression with these strange quotes `  ` which are found on the key to the left of the 1 key 
    cy.get('app-card').filter(`:contains("${productName}")`).then(function(element)
    {
        //Using :contains() puts into Jquery territory, so it will return a promise. So,need to use then() to resolve it. 
        // We use cy.wrap() so that we can again use cypress methods on the element.
        cy.wrap(element).should('have.length',1)

        //From the element we have found, we can use that as a starting point to look for a descendant element
        //We search for a descendant element with a tag of button that contains the text 'Add'
        cy.wrap(element).contains('button','Add').click()
    })

    //Select the first product (has tag of app-card) and click on its Add button
    cy.get('app-card').eq(0).contains('button','Add').click()
    //Click on the checkout button. This time we find the a (anchor) tag and then look for element that contains 'Checkout' text
    cy.contains('a', 'Checkout').click()


    let sum = 0
    //Get the value of total price of each product and check it is less than 200,000
    cy.get('tr td:nth-child(4) strong').each(function(element){

        //text to work on '₹. 65000'
        //This will split the text on space. Then it will get the 2nd index and trim spaces and finally convert to a number
        const amount = Number(element.text().split(" ")[1].trim())   
        sum = sum + amount


    }).then(function(){

        expect(sum).to.be.lessThan(200000)
    })


    


});


