import HomePage from '../../support/pageObjects/HomePage';
import ProductPage from '../../support/pageObjects/ProductPage';
import CartPage from '../../support/pageObjects/CartPage';
import ConfirmationPage from '../../support/pageObjects/ConfirmationPage';

const homePage = new HomePage();
const productPage = new ProductPage();
const cartPage = new CartPage();
const confirmationPage = new ConfirmationPage();

describe("Cypress Studio Demo", function () {
  it("Create a new transaction", function () {
    // Home Page: Login
    const baseURL = Cypress.env('url');
    const loginPageURL = `${baseURL}/loginpagePractise/#`;
    homePage.goTo(loginPageURL);
    homePage.login('rahulshettyacademy', 'learning');

    // Product Page: Add product to cart
    productPage.selectFirstProduct();
    productPage.goToCart();

    // Cart Page: Validate total price and proceed to checkout
    cartPage.getTotalCost(1, 1).should('equal', 100000);
    cartPage.clickOnCheckoutButton();

    // Confirmation Page: Submit details and verify success message
    confirmationPage.submitFormDetails();
    confirmationPage.getAlertMessage().should('contain', 'Success!');
  });
});