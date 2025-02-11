///<reference types="Cypress"/>


const { Given, When,Then, DataTable, Before} = require("@badeball/cypress-cucumber-preprocessor");
var assert = require('assert');
const { log } = require("console");
const { beforeEach } = require("mocha");



let unselectedCheckboxes = ['option1', 'option2', 'option3']



beforeEach(() => {
    cy.log("Running before each test...");
    
    unselectedCheckboxes = ['option1', 'option2', 'option3']
  });


  Given('I am on the Automation Practice page', function(){
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

//Set locators that can be found on entering the page
cy.get("[id='radio-btn-example'] [value='radio1']").as('radioBtn1Locator')
cy.get("[id='radio-btn-example'] [value='radio2']").as('radioBtn2Locator')
cy.get("[id='radio-btn-example'] [value='radio3']").as('radioBtn3Locator')

cy.get("[id='checkbox-example'] [name='checkBoxOption1']").as('checkBox1Locator')
cy.get("[id='checkbox-example'] [name='checkBoxOption2']").as('checkBox2Locator')
cy.get("[id='checkbox-example'] [name='checkBoxOption3']").as('checkBox3Locator')

cy.get('#autocomplete').as('countryDropdownLocator')

cy.get("[id='dropdown-class-example']").as('staticDropdown')

cy.get('#hide-textbox').as('hide')
cy.get('#displayed-text').as('showHideText')
cy.get('#show-textbox').as('show')

cy.get('#alertbtn').as('alertButton')
cy.get('#confirmbtn').as('confirmButton')

})

Given('I select various radio buttons', function(){
    
    //click on radio button 1, then button 2
    //Note: you can use iether click() or check() with radio buttons.
    cy.get('@radioBtn1Locator').click().should('be.checked')
    cy.wait(1000)
    cy.get('@radioBtn2Locator').click().should('be.checked')

    //click on radio button 3
    cy.get('@radioBtn3Locator').click().should('be.checked').and('have.value','radio3')
    cy.get('@radioBtn1Locator').should('not.be.checked')
    cy.get('@radioBtn2Locator').should('not.be.checked')       
})


When('I select checkbox {string}', function(option){
        
    //display list of unselected checkboxes
    displayList()

    //Click on given checkbox
    switch(option.toLowerCase())
    {
        
        case "option1":
            //When moving away from cypress commands and start using javascript code, need to add .then(function(){...}) 
            //at the cypress command chain.
            //If an element is covering another you can use {force:true} to make it wait until can interact with it
            cy.get('@checkBox1Locator').check({force:true}).should('have.value', option.toLowerCase()).then(function() {
                
                removeItem('option1');
                displayList(); 
                cy.log('List is'+unselectedCheckboxes)
                
            });
            break;
            case "option2":
                    cy.get('@checkBox2Locator').check().should('have.value', option.toLowerCase()).then(function() {
                    removeItem('option2');
                    displayList();  
                    cy.log('List is'+unselectedCheckboxes)                  
                });
                break;
            case"option3":
                cy.get('@checkBox3Locator').check().should('have.value', option.toLowerCase()).then(function(){
                removeItem('option3')
                cy.log('Unselected checkboxes = ')
                displayList()
                cy.log('List is'+unselectedCheckboxes)

                })
                break;
            default:
                cy.log("Invalid input "+option)
    } 

   
})


When ('only {string} remains unselected', function(unselectedItem){
    cy.log('unselected= '+unselectedItem)
    cy.log('List is'+unselectedCheckboxes)

    //Using javascript assert. OK seems to be its version of TRUE
    assert.ok(unselectedCheckboxes.includes(unselectedItem.toLowerCase()), "Assert message: incorrect checkbox unselected ")
})


When('a simpler approach for only {string} remains unselected', function(unselectedItem){
    var optionString = capitalizeFirstLetter(unselectedItem)
    var locatorString = "[id='checkbox-example'] [name='checkBox" + optionString + "']"
    
    cy.get(locatorString).should('not.be.checked')
    cy.log("optionstring "+optionString)
    cy.log("locatorstring "+ locatorString)
})


When('I enter {string} in the country dynamic dropdown', function(country){

//Enter given country in dynamic dropdown
cy.get('@countryDropdownLocator').type(country)


//Set locator value for dropdown menu items and loop until given country is found 
// then click on it
cy.get('.ui-menu-item').as('countryMenuItems')

cy.get('@countryMenuItems').each((el) =>{

    if(el.text()==country)
        { 
            //The click() method is deprecated in JQuery. Wrapping (like casting?) it with cy gets round this problem
            cy.wrap(el).click()
        }
})

})


When ('I select dropdown option {string}', function(option){

    //Cypress will check both the value part and displayed text part of the dropdown for the
    //given option and will match on either. The should('have.value', X) assertion will only
    //check on the value part of the dropdown.
    cy.get('@staticDropdown').select(option).should('have.value', option)

})


When ('I select hide', function(){
    cy.get('@hide').click()
})


Then('the the show hide example is invisible', function(){
    cy.get('@showHideText').should('not.be.visible')
})


When('I select show', function(){
    cy.get('@show').click()
})


Then ('the the show hide example is visible', function(){
    cy.get('@showHideText').should('be.visible')
})



When('I click on alert button and check its text', function(){
    cy.get('@alertButton').click()

    //Window: alert
    cy.on('window:alert', (str)=>
    {
        expect(str).to.equal('Hello , share this practice page and share your knowledge')
    }
    )

})

When ('I click on the confirm button and check its text', function(){
    
    cy.get('@confirmButton').click()
    //A confirm box displays a message with "OK" and "Cancel" buttons. 
    // You can handle it by returning false to dismiss the alert

    cy.on('window:confirm', function(text){
        assert.strictEqual(text, 'Hello , Are you sure you want to confirm?')
        return false //Dismiss the alert
    })

})



//Functions


// Function to display the list
function  displayList() {
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
    
    // Function to remove item from the list
    function removeItem(item){
        let index = unselectedCheckboxes.indexOf(item);
        if (index !== -1) {
            unselectedCheckboxes.splice(index, 1);
            console.log(`${item} removed from the list.`);
        } else {
            console.log(`${item} not found in the list.`);
        }
    
    }
    
    // Function to capitalise the first letter of a given string
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
      }
