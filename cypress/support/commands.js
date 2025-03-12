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



//in the .add() method, pass in the command/method name and its parameters and then pass the (name, (parma1, parm2)) to body of the function

Cypress.Commands.add('checkTableCellText', function (colNo, rowNo, expectedText) {

  cy.get('table').find('tr').eq(rowNo).find('td').eq(colNo - 1).invoke('text')
    .then((actualText) => {
      expect(actualText).to.contain(expectedText)


    })

  })

  Cypress.Commands.add('submitFormDetails', function(){

     cy.get('#country').type('India')
    //This is slow to respond, so need in increase timeout just for this element
    cy.get('.suggestions ul li a', { timeout: 10000 }).click()
    cy.contains('input','Purchase').click()

    cy.log("Calling command")
    

  })

  Cypress.Commands.add('hello', () => {
    cy.log("Hello there, said Obi Wan");
});





   


