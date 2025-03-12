
class ConfirmationPage
{
    

//NOTE:
//Cypress commands (e.g. cy.submitFormDetails()) can only be used inside methods, not directly within the class definition. 

submitFormDetails(){

    cy.submitFormDetails()
}   

getAlertMessage()
{
    return cy.get(".alert-success")
}

}

export default ConfirmationPage