import { FRONTEND_URL } from "../../constants/backend.constants"

// TODO: Generate random project information and login credentials
describe('Project creation flow', () => {
  Cypress.Cookies.debug(true);

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('next-auth.csrf-token', 'next-auth.session-token')
  });

  // Click on the 'New Project' button
  it('Visit CoZero challenge', () => {
    cy.visit(FRONTEND_URL);
  });

  // it('Login', () => {
  //   cy.get('#new-project').click();
  //   // Fill email and password type inputs
  //   cy.get('input[name="email"]').type('me@santek.dev');
  //   cy.get('input[name="password"]').type('12345678');
  //   // Click on the submit type button
  //   cy.get('button').contains('Sign in with Credentials').click();
  //   // Wait for the page to load
  //   cy.wait(3000);
  // });

  // Enter a project name and click 'Create project'
  it('Create new project', () => {
    cy.get('#new-project').click();
    cy.get('input[name="name"]').type('New project WENARDO');
    // Fill description
    cy.get('textarea[name="description"]').type('This is a new project');

    //Type a proposal in input with id listing-proposal-input
    cy.get('#listing-proposal-input').type('This is a new proposal');
    // Hit enter
    cy.get('#listing-proposal-input').type('{enter}');
    // Check if the proposal is in the list
    cy.get('#listing-proposals').contains('This is a new proposal');
    // Create another proposal
    cy.get('#listing-proposal-input').type('This is another proposal');
    cy.get('#listing-proposal-input').type('{enter}');
    // Check if the proposal is in the list
    cy.get('#listing-proposals').contains('This is another proposal');

    // Click on the 'Create project' button
    cy.get('button').contains('Create Project').click();
  
  });

  it('Check if the project is created', () => {
    // Wait for the page to load
    cy.wait(3000);
    // Check if the url contains /projects
    cy.url().should('include', '/projects');

    // Check if the project name is in whole page
    cy.get('p').contains('New project');
  });
  
})