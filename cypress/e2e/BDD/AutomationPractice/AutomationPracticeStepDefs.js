/// <reference types="Cypress"/>

const { Given } = require("@badeball/cypress-cucumber-preprocessor");

Given('I am on the Automation Practice page', function(){
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

    //Set locator values
    cy.get("[id='radio-btn-example'] [value='radio1']").as('radioBtn1Locator')
    cy.get("[id='radio-btn-example'] [value='radio2']").as('radioBtn2Locator')
    cy.get("[id='radio-btn-example'] [value='radio3']").as('radioBtn3Locator')


    //click on radio button 1, then button 2
    cy.get('@radioBtn1Locator').click().should('be.checked')
    cy.wait(1000)
    cy.get('@radioBtn2Locator').click().should('be.checked')

    //click on radio button 3
    cy.get('@radioBtn3Locator').click().should('be.checked').and('have.value','radio3')
    cy.get('@radioBtn1Locator').should('not.be.checked')
    cy.get('@radioBtn2Locator').should('not.be.checked')

})