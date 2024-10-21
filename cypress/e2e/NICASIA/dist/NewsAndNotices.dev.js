"use strict";

describe('Test cases for NIC ASIA News and Notices Module', function () {
  beforeEach(function () {
    cy.visit('https://cms-nicasia.server247.info/');
    cy.fixture('loginData').as('loginData');
  });
  it('Should be able to locate and click on News & Notices Menu', function () {
    cy.get('@loginData').then(function (data) {
      cy.get('[data-cy="email-text-field"]').type(data.validUser.email);
      cy.get('[data-cy="login-password-field"]').type(data.validUser.password);
      cy.get('[data-cy="login-submit-button"]').click(); // cy.url().should('include', '/dashboard')
      // cy.get('h1').should('contain.text','&nbsp;Welcome to NIC ASIA Bank CMS')
    });
  });
});