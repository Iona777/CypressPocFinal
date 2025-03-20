class ProductPage {

    pageValidation() {
        cy.contains("Shop Name").should('be.visible')
    }

    getCardCount() {
        return cy.get('app-card').should('have.length', 4)
    }


    selectFirstProduct() {
        //Select the first product (has tag of app-card) and click on its Add button
        
        cy.get('app-card').eq(0).contains('button', 'Add').click()
        cy.debug()
    }

    selectProduct(productName) {

         //filter() will return only those elements that match the given filter expression. This is easier to write then loop seen earlier
        //:contains() is a JQyuery command and needs to be proceeded by :
        //To use a parameter in the contains() command, you need to use "${parameterName}" .
        // You also need to wrap the whole expression with these strange quotes `  ` which are found on the key to the left of the 1 key 
        cy.get('app-card').filter(`:contains("${productName}")`).then(function (element) {
            //Using :contains() puts you into Jquery territory, so it will return a promise. So,need to use then() to resolve it. 
            // We use cy.wrap() so that we can again use cypress methods on the element.
            cy.wrap(element).should('have.length', 1)

            //From the element we have found, we can use that as a starting point to look for a descendant element
            //We search for a descendant element with a tag of button that contains the text 'Add'
            cy.wrap(element).contains('button', 'Add').click()
        })

    }
    verifyNumberOfItems(expectedNumerOfItems)
    {

        cy.contains('a', 'Checkout').should('contain', expectedNumerOfItems)
    }
    
    goToCart()
    {
        cy.contains('a', 'Checkout').click()
    }
}

//Don't forget the export or your class will not be found
export default ProductPage