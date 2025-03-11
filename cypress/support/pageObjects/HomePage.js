class HomePage
{
    constructor()
    {
    //Set locators that can be found on entering the page    
    this.passwordLocator = '#password'
    this.userNameLocator = '#username'

        
    }
    goTo(url)
    {
        cy.visit(url)
    }

    login(userName, password)
    {

    //Enter credentials ( will parameterise this further later on)
    cy.get(this.userNameLocator).type(userName)
    cy.get(this.passwordLocator).type(password)

    //Can use contains() to get element that contains the given visible text
    cy.contains('Sign In').click()
 
    }
}

//Don't forget the export or your class will not be found
export default HomePage;