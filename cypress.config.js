const { defineConfig } = require("cypress");

const browserify = require("@cypress/browserify-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  preprendTransformerToOptions,
} = require("@badeball/cypress-cucumber-preprocessor/browserify");

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    browserify(preprendTransformerToOptions(config, browserify.defaultOptions)),
  );


  // implement node event listeners here
  
  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({

    
  env:{
    url: 'https://rahulshettyacademy.com',
    userName: "rahulshettyacademy",
    password: "learning"
  }
  ,
  
  e2e: {

    /* Covered above I think. Just call the function
    setupNodeEvents(on, config) { 
    },
    */

    setupNodeEvents,

    specPattern: "cypress/e2e/*js",
    //specPattern: "**/*.feature",
    supportFile: "cypress/support/e2e.js",
    experimentalStudio: true //this allows you to use the Cypress Studio to record and play 
  },
});
