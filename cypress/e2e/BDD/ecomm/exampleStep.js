const{Given, When, Then} = require("@badeball/cypress-cucumber-preprocessor")


Given('I am on the example page', function(){
    cy.visit('https://example.cypress.io')
})


/*
Given ('I am on the example page', ()=> {
    cy.visit('https://example.cypress.io')

});
*/
