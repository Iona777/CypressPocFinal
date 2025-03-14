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

    //const loginPageURL = 'https://rahulshettyacademy.com/loginpagePractise/#'

    //NOTE: changes to cypress.config file are not always picked up on save, so you may get an undefined error when first using Cypress.env() 
    // to fix this and pick up the changes, restart cypress runner, or even restart cypress completely. 
    const baseURL= Cypress.env('url')
    const loginPageURL = (baseURL+"/loginpagePractise/#")
    const productName = "Nokia Edge"

    homePage.goTo(loginPageURL)
    //homePage.login('rahulshettyacademy', 'learning')
    homePage.login(Cypress.env('userName'), Cypress.env('password'))

    //Product page
    productPage.pageValidation()
    productPage.getCardCount().should('have.length', 4)
    productPage.selectProduct(productName)
    productPage.selectFirstProduct()
    productPage.goToCart()

    //Seems not to pause, just puts output to consol (not cypress console)
    cy.debug()

    //Cart page
    cartPage.sumOfProducts().then(function (sum) {
        //Putting the assertion in the test insstead of the function
        expect(sum).to.be.lessThan(200000)
    })

    cartPage.clickOnCheckoutButton()

    //Confirmation page
    confirmationPage.submitFormDetails()
    confirmationPage.getAlertMessage().should('contain', 'Success')

});


