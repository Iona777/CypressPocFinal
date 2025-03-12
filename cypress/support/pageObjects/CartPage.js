class CartPage
{



 sumOfProducts()
 {

    let sum = 0
    //Get the value of total price of each product and check it is less than 200,000
    ///Looks like you have to have a return here in order to make this chainable, i.e. to be able to add the() when calling it.
    //If you find that then() (with lowercase t) is not available when calling a method, then try adding a return at the start of its definition
   return cy.get('tr td:nth-child(4) strong').each(function(element){
   
        //text to work on '₹. 65000'
        //This will split the text on space. Then it will get the 2nd index and trim spaces and finally convert to a number
        const amount = Number(element.text().split(" ")[1].trim())   
        sum = sum + amount


    }).then(function(){
        //You are only returning this value to its parent block (the each() function), not to the sumOfMethods() function, which is why you need the 
        //other return at the top
        return sum
    })

 }

 clickOnCheckoutButton()
 {
    cy.contains('button', 'Checkout').click()
    
 }

}
//Don't forget the export or your class will not be found
export default CartPage;