// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { Then } from "@badeball/cypress-cucumber-preprocessor"


//in the .add() method, pass in the command/method name and its parameters and then pass the (name, (parma1, parm2)) to body of the function

Cypress.Commands.add('checkTableCellText', function(colNo, rowNo, expectedText){

  cy.get('table').find('tr').eq(rowNo).find('td').eq(colNo-1).invoke('text')
  .then( (actualText) => {
    expect(actualText).to.contain(expectedText)


  })


})


/*
Cypress.Commands.add('checkTableCellText', (colNo, rowNo, expectedText) => {

  cy.get('table').find('tr').eq(rowNo).find('td').eq(colNo-1).invoke('text').then((text) => {
    expect(text).to.contain(expectedText)    
  })

    
      });





  });
  */
 