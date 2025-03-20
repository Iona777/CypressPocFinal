class CartPage
{

totalCost=0 

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

getTotalCost()
{
   cy.getTableCellText(5, 4).then(tableText => {
      //Get the text of the total cost from the table on screen
      this.totalCost = tableText

      //Once we have the text into our totalCost variable, then trim to remove the currency symbol 
      this.totalCost = Number(this.totalCost.split(" ")[1].trim()) 
      cy.log("trimed cost is "+ this.totalCost)
      
    });
}


amendQuantity(quantity)
{
   cy.get('.col-sm-1 .form-control').each(function(el)
   {
      //Using each() takes us int JQuery territory, so need to yse cy.wrap() to ba bal to use cypress commands.
      cy.wrap(el).clear()
      cy.wrap(el).type(quantity).should('have.value', quantity)
      
   })
}

removeItem(itemToRemove)
   {
      cy.pause()

      cy.get('table tbody tr').each(($row) => {
         cy.wrap($row)
           .find('td') // Get all cells in the row
           .first() // Assuming the text is in the first column, modify if needed
           .invoke('text')
           .then((cellText) => {
            cy.log('looking for text '+ itemToRemove)
            cy.log('cell text is'+ cellText)

            //if (cellText.trim().indexOf(itemToRemove)>0 ) 

             //if (cellText.trim() == itemToRemove) { // Replace 'Target Text' with your actual search text
            if (cellText.trim().includes(itemToRemove) ) { // Replace 'Target Text' with your actual search text
               cy.wrap($row).find('td').eq(4).click(); // Select the 3rd column (index 2)
             }
           });
       });
       
   }


}
//Don't forget the export or your class will not be found
export default CartPage;