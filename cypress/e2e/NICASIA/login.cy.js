describe('Login Test cases for NIC ASIA Login Page', () => {

  beforeEach(() => {
    cy.visit('https://cms-nicasia.server247.info/')
    cy.fixture('loginData').as('loginData')  // Load fixture and alias it for easy use
  });

  // Test case 1: Valid username and password
  it('should log in to the Dashboard with valid credentials', function() {
    cy.get('@loginData').then((data) => {
      cy.get('[data-cy="email-text-field"]').type(data.validUser.email)
      cy.get('[data-cy="login-password-field"]').type(data.validUser.password)
      cy.get('[data-cy="login-submit-button"]').click()

      cy.url().should('include', '/dashboard')
      // cy.get('h1').should('contain.text','&nbsp;Welcome to NIC ASIA Bank CMS')
    })
  });

  // Test case 2: Invalid username and password
  it('should show an error with invalid credentials', function() {
    cy.get('@loginData').then((data) => {
      cy.get('[data-cy="email-text-field"]').type(data.invalidUser.email)
      cy.get('[data-cy="login-password-field"]').type(data.invalidUser.password)
      cy.get('[data-cy="login-submit-button"]').click()

      cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', 'The provided credentials are incorrect')
    })
  });

  // Test case 3: Empty email field
  it('should show an error when email field is empty', function() {
    cy.get('@loginData').then((data) => {
      cy.get('[data-cy="email-text-field"]').clear()
      cy.get('[data-cy="login-password-field"]').type(data.validUser.password)
      cy.get('[data-cy="login-submit-button"]').click()

      cy.get('.field-error-message').should('have.text', 'Email is required')
    })
  });

  // Test case 4: Empty password field
  it('should show an error when password field is empty', function() {
    cy.get('@loginData').then((data) => {
      cy.get('[data-cy="email-text-field"]').type(data.validUser.email)
      cy.get('[data-cy="login-password-field"]').clear()
      cy.get('[data-cy="login-submit-button"]').click()

      cy.get('.field-error-message').should('have.text', 'Password is required')
    })
  });

  // Test case 5: Empty email and password fields
  it('should show errors for both empty email and password fields', function() {
    cy.get('@loginData').then((data) => {
      cy.get('[data-cy="email-text-field"]').clear()
      cy.get('[data-cy="login-password-field"]').clear()
      cy.get('[data-cy="login-submit-button"]').click()

      cy.get('.field-error-message').contains('Email is required')
      cy.get('.field-error-message').contains('Password is required')
    })
  });

  // Test case 6: Toggling password visibility
  it('should toggle password visibility when eye icon is clicked', function() {
    cy.get('@loginData').then((data) => {
      cy.get('[data-cy="login-password-field"]').type(data.validUser.password)

      // Initially password is hidden
      cy.get('[data-cy="login-password-field"]').should('have.attr', 'type', 'password')

      // Toggle password visibility
      cy.get('.bi').click()
      cy.get('[data-cy="login-password-field"]').should('have.attr', 'type', 'text')

      // Toggle back to hidden
      cy.get('.bi').click()
      cy.get('[data-cy="login-password-field"]').should('have.attr', 'type', 'password')
    })
  });
})
