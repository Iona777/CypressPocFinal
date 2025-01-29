const { Given } = require("@badeball/cypress-cucumber-preprocessor");

Given('I am on the Automation Practice page', function(){
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

    //Set locator values
    cy.get("[id='radio-btn-example'] [value='radio1']").as('radioBtn1Locator')


    //click on radio button 1
    cy.get('@radioBtn1Locator').click()

})