const { Given, When, Then, DataTable, Before } = require("@badeball/cypress-cucumber-preprocessor");

//There does not seem to an entry in @cucumber/cucumber for 'And', so set it be same as 'Then'
const And = Then


//Looks like typing 'import <classname>' will automatically find the page for you. 
// So, this now appears to be the preferred method rather than using requires.
import HomePage from "../../../support/pageObjects/homePage";
import ProductPage from "../../../support/pageObjects/ProductPage";
import CartPage from "../../../support/pageObjects/CartPage";
import ConfirmationPage from "../../../support/pageObjects/ConfirmationPage";


const homePage = new HomePage();
const productPage = new ProductPage() 
const cartPage = new CartPage()  
const confirmationPage = new ConfirmationPage()


Given(`I am on the ecommn practice login page`, () => {

    const loginPageURL = 'https://rahulshettyacademy.com/loginpagePractise/#'
    const productName = "Nokia Edge"

    homePage.goTo(loginPageURL)
    homePage.login('rahulshettyacademy','learning' )

    //Product page
    productPage.pageValidation()
    productPage.verifyCardLimit()
    productPage.selectProduct(productName)
    productPage.selectFirstProduct()
    productPage.goToCart()



    



    //cy.get('app-card').should('have.length',4)

    //filter() will return only those elements that match the given filter expression. This is easier to write then loop seen earlier
    //:contains() is a JQyuery command and needs to be proceeded by :
    //cy.get('app-card').filter(':contains("Nokia Edge")').then(function(element)

    //To use a paramter in the contains() command, you need to use "${parameterName}" .
    // You also need to wrap the whole expression with these strange quotes `  ` which are found on the key to the left of the 1 key 
    /*
    cy.get('app-card').filter(`:contains("${productName}")`).then(function(element)
    {
        //Using :contains() puts into Jquery territory, so it will return a promise. So,need to use then() to resolve it. 
        // We use cy.wrap() so that we can again use cypress methods on the element.
        cy.wrap(element).should('have.length',1)

        //From the element we have found, we can use that as a starting point to look for a descendant element
        //We search for a descendant element with a tag of button that contains the text 'Add'
        cy.wrap(element).contains('button','Add').click()
    })

    */

    //Select the first product (has tag of app-card) and click on its Add button
    //cy.get('app-card').eq(0).contains('button','Add').click()

    //Click on the checkout button. This time we find the a (anchor) tag and then look for element that contains 'Checkout' text
    //cy.contains('a', 'Checkout').click()


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

    //Now click on Checkout button, enter a country and click on Purchase button
    cy.contains('button', 'Checkout').click()
    cy.get('#country').type('India')
   
    //This is slow to respond, so need in increase timeout just for this element
    cy.get('.suggestions ul li a', { timeout: 10000 }).click()

    cy.contains('input','Purchase').click()
    cy.get('.alert-success').should('contain', 'Success')


});


