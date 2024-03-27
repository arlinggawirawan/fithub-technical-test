// Commands open URL
Cypress.Commands.add('visitHomePage', () => {
    cy.visit('https://reqres.in/');
});

// Commands request API with response OK
Cypress.Commands.add('requestAPI', (method, url, body ) => {
    cy.request({
      method: method,
      url: url,
      body: body
    });
  });

// Commands request API with response error 
Cypress.Commands.add('requestAPIWithError', (method, url, body, options = {}) => {
    const failOnStatusCode = options.failOnStatusCode !== undefined ? options.failOnStatusCode : true;
  
    cy.request({
      method: method,
      url: url,
      body: body,
      failOnStatusCode: failOnStatusCode,
      ...options // Additional options
    });
  });

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

  