describe('Playground Tests', () => {
  beforeEach(() => {
      cy.visit('https://playground.testingart.com/');
      cy.get('#email-field').type('testingart@email.com');
      cy.get('[id="password-field"]').type('Testing!123');
      cy.get('button#submitBtn').click();
  });

  it('Show More/Less', () => {
      cy.get('button').contains('Show More').click();
      cy.get('button').contains('Show More').should('not.exist');
      cy.get('button').contains('Show Less').should('be.visible');
      cy.get('button').contains('Show Less').click();
      cy.get('button').contains('Show Less').should('not.exist');
      cy.get('button').contains('Show More').should('be.visible');
  });

  it('Forms Tab', () => {
      cy.get('a[href="/forms"]').click();

      cy.get('#firstName').clear().type('Test First Name');
      cy.get('#firstName').should('have.value', 'Test First Name');

      cy.get('#lastName').clear().type('Test Last Name');
      cy.get('#lastName').should('have.value', 'Test Last Name');

      cy.get('#email').clear().type('test@test.test');
      cy.get('#email').should('have.value', 'test@test.test');

      cy.get('button[type="submit"]').click();

      cy.wait(2000); 
  
      cy.get('#firstName').should('have.value', 'Test First Name');
      cy.get('#lastName').should('have.value', 'Test Last Name');
      cy.get('#email').should('have.value', 'test@test.test'); 

      cy.url().should('include', '/forms');
  });
});

Cypress.Commands.add('submitFormAndVerifyReset', (firstName, lastName, email) => {
  cy.get('#firstName').clear().type(firstName);
  cy.get('#lastName').clear().type(lastName);
  cy.get('#email').clear().type(email);

  cy.get('button[type="submit"]').click();

  cy.wait(2000); 

  cy.get('#firstName').should('have.value', 'Test First Name'); 
  cy.get('#lastName').should('have.value', 'Test Last Name');  
  cy.get('#email').should('have.value', 'test@test.test'); 
});

describe('Playground Tests', () => {
  beforeEach(() => {
      cy.visit('https://playground.testingart.com/');
      cy.get('#email-field').type('testingart@email.com');
      cy.get('[id="password-field"]').type('Testing!123');
      cy.get('button#submitBtn').click();
  });

  it('Forms Tab with then()', () => {
      cy.get('a[href="/forms"]').click();

      cy.submitFormAndVerifyReset('Test First Name', 'Test Last Name', 'test@test.test')

      cy.get('#firstName').then(($firstName) => {
          expect($firstName.val()).to.equal('Test First Name'); 
      });

      cy.get('#lastName').then(($lastName) => {
          expect($lastName.val()).to.equal('Test Last Name');
      });

      cy.get('#email').then(($email) => {
          expect($email.val()).to.equal('test@test.test'); 
      });
      cy.url().then((url) => {

          expect(url).to.include('/forms');
      });
  });
});
