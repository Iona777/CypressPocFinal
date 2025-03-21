const { Given, When, Then, DataTable, Before } = require("@badeball/cypress-cucumber-preprocessor");

//There does not seem to an entry in @cucumber/cucumber for 'And', so set it be same as 'Then'
const And = Then



// Make very sure that Js has not added extra imports somewhere without telling you! Look all around the last file you worked on 
// if it goes crazy with complaing about imports



//Seems that you can user either import or requires here. I think it is only cypress's own files that can only use require
import HomePage from '../../../support/pageObjects/HomePage'
const ProductPage = require("../../../support/pageObjects/ProductPage")
const CartPage = require("../../../support/pageObjects/CartPage")
const ConfirmationPage = require("../../../support/pageObjects/ConfirmationPage")


const homePage = new HomePage();
const productPage = new ProductPage()
const cartPage = new CartPage()
const confirmationPage = new ConfirmationPage()



Given(`I am on the ecommn practice login page`, () => {

    //NOTE: changes to cypress.config file are not always picked up on save, so you may get an undefined error when first using Cypress.env() 
    // to fix this and pick up the changes, restart cypress runner, or even restart cypress completely. 
    const baseURL = Cypress.env('url')
    const loginPageURL = (baseURL + "/loginpagePractise/#")

    homePage.goTo(loginPageURL)

})


When('I login to the application', function () {

    homePage.login(Cypress.env('userName'), Cypress.env('password'))

    //Product page
    productPage.pageValidation()
    productPage.getCardCount().should('have.length', 4)


})

When('I login to the application portal', function (dataTable) {

    homePage.login(dataTable.rawTable[1][0], dataTable.rawTable[1][1])

    //Product page
    productPage.pageValidation()
    productPage.getCardCount().should('have.length', 4)

})


And('I add items to Cart and checkout', function () {
    const productName = "Nokia Edge"

    productPage.selectProduct(productName)
    productPage.selectFirstProduct()
    productPage.goToCart()

})

And('Validate the total price limit', function () {
    //Seems not to pause, just puts output to consol (not cypress console)
    cy.debug()

    //Cart page
    cartPage.sumOfProducts().then(function (sum) {
        //Putting the assertion in the test insstead of the function
        expect(sum).to.be.lessThan(200000)

    })

})

Then('select the country submit and verify success message', function () {
    cartPage.clickOnCheckoutButton()

    //Confirmation page
    confirmationPage.submitFormDetails()
    confirmationPage.getAlertMessage().should('contain', 'Success')
})


And('I add the following items to Cart and checkout {string}, {string}, {string}', function (item1, item2, item3) {
    productPage.selectProduct(item1)
    productPage.selectProduct(item2)
    productPage.selectProduct(item3)
    productPage.verifyNumberOfItems(3)

    productPage.goToCart()

})

And('I take note of sum of products', function () {


    //the value returned from getTotalCost() seems to need to be passed into a function to be used properly
    cartPage.getTotalCost(5, 4)
        .then(function (amount) {
            //Set value of total cost at this point. Seems that defining originalTotalCost at top of file has no effect, seems only constants can be declared there. 
            // It is declared as a 'class' variable here and becomes avaiable to all methods from this point on.
            this.originalTotalCost = amount
            cy.log("Original total cost is (should be 235,000)" + this.originalTotalCost)

        })
        //Don't try logging the value of this.originalTotalCost here. Due to asynchronous problems, this could get executed before code above and give wrong value
       

})

And('I change the quantity of each item to {int}', function (newQuantity) {

    cartPage.amendQuantity(newQuantity)

})

And('I remove {string}', function (itemToRemove) {

    cartPage.removeItem(itemToRemove)

})

Then('the the new sum of products should be {string} than the previous one', function (comparison) {


    //the value returned from getTotalCost() seems to need to be passed into a function to be used properly
    cartPage.getTotalCost(5, 3)
        .then(function (amount) {
            //We keep the class variable this.originalTotalCost unchanged and set a new variable. Can get a way with a local variable now
            switch (comparison) {
                case "higher":
                    cy.wrap(amount).should('be.greaterThan', this.originalTotalCost)
                    break;
                case "lower":
                    cy.wrap(amount).should('be.lessThan', this.originalTotalCost)
                    break;
                case "same":
                    cy.wrap(amount).should.equal(this.originalTotalCost)
                    break;
                default:
                    cy.log("invalid comparison string")


            }

        })


   


})