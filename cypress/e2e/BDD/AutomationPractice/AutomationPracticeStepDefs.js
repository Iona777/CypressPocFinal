// ///<reference types="Cypress"/>  -including this seems to cause problems. I think it is already included as part of package file?
import 'cypress-iframe'

const { Given, When,Then, DataTable, Before} = require("@badeball/cypress-cucumber-preprocessor");
var assert = require('assert');
//const { log } = require("console");
const { beforeEach } = require("mocha");


let unselectedCheckboxes = ['option1', 'option2', 'option3']


//May need to login before being able to access this though
let offersPageURL = 'https://rahulshettyacademy.com/seleniumPractise/#/offers'


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

cy.get('#opentab').as('openTabButton')

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
    })

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

When ('I test tabs', function(){

//Calls the JQuery invoke() method to remove the target attribute 
// so that the link will no longer be opened in a separate tab.
//Now you can click on the openTabButton
cy.get('@openTabButton').invoke('removeAttr', 'target').click()

//Clicking on this will take you to a different domain. To handle this, you need this code. 
// This will set the origin to the new domain and you include a function with all the code 
//that you want to run in this domain.
cy.origin("https://www.qaclickacademy.com", function(){
    //Using *=  appears to mean 'contains'
    cy.get("#navbarSupportedContent  a[href*='about']").click()
    cy.get('.mt-50 h2').should('contain', 'QAClick Academy')

})

//Alternatively, instead of using 
// invoke('removeAttr', 'target'), you can just navigate directly to the URL that would the openTabButton would take you to, 
// and then apply cy.origin() as above. 


})

When('I check that the price of the course {string} is {string}',function(course, expectedPrice){

    //Gets all rows (tr) then all the columns within each row (td) 
    // then just the 2nd column (nth-child(2))
    cy.get('tr td:nth-child(2)').each(function(element,index){

        const text=element.text()
    
        //Can also use text.includes() if you want to check if the element text contains a given string.
        //if(text.includes('Master Selenium Automation in simple Python Language'))
        if (text== course)
        {
            //This will return the element based on the index of the iteration and then get 
            //its next sibling.
            //The returned element will be called price and passed into the following function
            cy.get('tr td:nth-child(2)').eq(index).next().then(function(actualPrice){
    
                const actualPriceText = actualPrice.text()
                expect(actualPriceText).to.equal(expectedPrice)
            })
        }
    
    })
    
})


When('I check that the text in column {int} of row {int} is {string}', function(columnNo,rowNo, expectedText ){
  // Variables for row and column indexes
  //row (0-based index, BUT frist row here is the header, so no need to reduce by 1)
  // nth column (0-based index, so reduce given value by 1)
 
  //'table' happens to be the locator for the table
   cy.get('table').find('tr').eq(rowNo).find('td').eq(columnNo-1).invoke('text').then((text) => {
   expect(text).to.equal(expectedText)

 })

})

When ('I check that the text in column {int} of row {int} contains {string} using a function', function(colNo, rowNo, expectedText)
{
    //Basically the same as test above, except it calls a re-usable function
    checkGivenColumnAndRowContainsValue(colNo,rowNo, expectedText)

    //Or could do the same by putting the code in a cypress command
    cy.checkTableCellText(colNo,rowNo, expectedText)

})

When('I hover over Mouse Hover element and select top from options', function(){

    cy.get('div.mouse-hover-content').as('mouseHover')
    cy.get('@mouseHover').invoke('show')

    //Finds element that contains given text and clicks on it.
    cy.contains('Top').click()
    //Check value of URL in address bar
    cy.url().should('include','top')

})

When('I forceably click on a hidden element', function(){

    //Click on element, even though it is hidden
    cy.contains('Top').click({force:true})
    //Check value of URL in address bar
    cy.url().should('include','top')
})


When('I test iFrames', function(){

    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    //Loads the given frame based on iframe Id. Cypress is now aware of this frame
    cy.frameLoaded('#courses-iframe') 
    //Puts Cypress into 'iframe mode' as it were. Finds given element in the iframe and clicks on it
    //cy.iframe()
    cy.iframe().find("a[href*='mentorship']").eq(0).click();
    cy.iframe().find("a[href*='practice-project']")

    cy.iframe().find(".row").should('have.length',11)

    //This one does not work, just does not want to find this element, but cannot see why
    //cy.iframe().find("h1[class*='pricing-title']").should('have.length',2)
     
})


When('I test calendars', function(){

const monthNumber = "6"
const day = "15"
const year = "2027"
const expectedDateList = [monthNumber, day, year]

cy.visit(offersPageURL)
cy.get('.react-date-picker__inputGroup').click()

//The classname is quite long. Seems you get sometimes get away with a partial classname.
cy.get('.react-calendar__navigation__label').click()
//Click again
cy.get('.react-calendar__navigation__label').click()

//Finds all button tags that contain the text of the 'year' constant and clicks on the first one it finds. 
// Should only be 1 that matches though
cy.contains("button", year).click()

//The class will get all the months. eq() will return the one with given index. Number converts the monthNumber string to a number 
cy.get('.react-calendar__year-view__months__month').eq(Number(monthNumber)-1).click()

//Finds all abbr tags that contain the text of the 'day' constant and clicks on the first one it finds
// Should only be 1 that matches though
cy.contains("abbr", day).click()

 
//Assertion
//This will get the 3 parts of the displayed data and then loop through each to check its value.
cy.get("[class*='react-date-picker__inputGroup__input']").each(function(element, index)
{
  
//We are in Jquery territory here, so the element is a 'promise' so need to resolve it to get actual element using wrap()
//Then we invoke the JQuuery command 'val' to get the value attribute's contents
cy.wrap(element).invoke('val').should('eq', expectedDateList[index])


})


})

//FUNCTIONS


//Function to check value of a table cell
function checkGivenColumnAndRowContainsValue(colNo, rowNo, expectedText)
{
    cy.get('table').find('tr').eq(rowNo).find('td').eq(colNo-1).invoke('text').then((actualText) => {
        expect(actualText).to.contain(expectedText)    
      })
     
} 


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
