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

Cypress.Commands.add('getTableCellText', (tableSelector, rowIndex, colIndex) => {
    cy.get(`${tableSelector} tbody tr`) // Get all table rows in tbody
      .eq(rowIndex - 1) // Select the mth row (0-based index)
      .find('td') // Find all columns in that row
      .eq(colIndex - 1) // Select the nth column (0-based index)
      .invoke('text') // Get text content
      .then((text) => {
        cy.log(`Cell text: ${text.trim()}`); // Log the extracted text
        return text.trim();
      });
  });
  