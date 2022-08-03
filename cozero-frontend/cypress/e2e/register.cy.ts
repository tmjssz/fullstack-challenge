import { FRONTEND_URL } from "../../constants/backend.constants"

describe('Registration flow', () => {
  it('Visit CoZero challenge', () => {
    cy.visit(FRONTEND_URL);
  })

  it('Register new user', () => {
    // Search a 'Sign up' element
    cy.get('#signup').click();


    // Enter a email and password and click 'Create account'
    cy.get('input[name="email"]').type('hola@hola.com');
    cy.get('input[name="password"]').type('hola');
    cy.get('button').contains('Create account').click();

    //Search 'Sign out' text
    cy.get('#signup').contains('Sign out');

    // Not allowed to access to /register
    cy.visit(`${FRONTEND_URL}register`);
    cy.url().should('eq', `${FRONTEND_URL}`);
  })
})