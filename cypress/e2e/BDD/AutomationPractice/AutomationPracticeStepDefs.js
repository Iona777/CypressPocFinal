console.log// /// <reference types="Cypress"/>
const { Given, When,Then, DataTable } = require("@badeball/cypress-cucumber-preprocessor");
var assert = require('assert');
const { log } = require("console");
const { closeSync } = require("fs");

  //Keep track of which checkboxes have been selected

let unselectedCheckboxes = ['option1', 'option2', 'option3']

Given('I am on the Automation Practice page', function(){
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
})

Given('I select various radio buttons', function(){
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





When('I select checkbox {string}', function(option){
    
    
    //Set locator values
    cy.get("[id='checkbox-example'] [name='checkBoxOption1']").as('checkBox1Locator')
    cy.get("[id='checkbox-example'] [name='checkBoxOption2']").as('checkBox2Locator')
    cy.get("[id='checkbox-example'] [name='checkBoxOption3']").as('checkBox3Locator')

    displayList()

    //Click on given checkbox
    switch(option.toLowerCase())
    {
        
        case "option1":
            cy.get('@checkBox1Locator').check().should('have.value', option.toLowerCase()).then(function() {
                
                removeItem('option1');
                displayList(); 
                cy.log('List is'+unselectedCheckboxes)
                
            });
            break;

            case "option2":
                    cy.get('@checkBox2Locator').check().should('have.value', option.toLowerCase()).then(function() {
                    removeItem('option2');
                    displayList();                    
                });
                break;
            case"option3":
                cy.get('@checkBox3Locator').check().should('have.value', option.toLowerCase()).then(function(){
                //removeItem('option3')
                cy.log('Unseleted checkboxes = ')
                displayList()

                })
                break;
            default:
                cy.log("Invalid input "+option)
    } 

   
})


When ('only {string} remains unselected', function(unselectedItem){
    cy.log('unselected= '+unselectedItem)
    cy.log('List is'+unselectedCheckboxes)
    assert(unselectedCheckboxes.includes(unselectedItem.toLowerCase()))

    //consider changing this to assert that unselected should('be.unchecked') or similar. Perhaps loop around the uncheckeditems list

})



// Function to display the list
function displayList() {
cy.log("List length= "+unselectedCheckboxes.length)

    if (unselectedCheckboxes.length === 0) {
        cy.log("The list is empty.");
    } else {
        cy.log("Current List:");
       return unselectedCheckboxes.forEach((item, index) => {
            cy.log(`${index + 1}. ${item}`);
        });
    }
}


function removeItem(item){
    let index = unselectedCheckboxes.indexOf(item);
    if (index !== -1) {
        unselectedCheckboxes.splice(index, 1);
        console.log(`${item} removed from the list.`);
    } else {
        console.log(`${item} not found in the list.`);
    }

}









