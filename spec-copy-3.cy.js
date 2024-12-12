describe('Playground Tests', () => {
  beforeEach(() => {
      cy.visit('https://playground.testingart.com/');
      cy.get('#email-field').type('testingart@email.com');
      cy.get('[id="password-field"]').type('Testing!123');
      cy.get('button#submitBtn').click();
  });

  it('Show More/Less', () => {
      cy.get('button').contains('Show More').click();
      cy.get('button').contains('Show More').should('not.exist'); // Ensure "Show More" button disappears
      cy.get('button').contains('Show Less').should('be.visible'); // Ensure "Show Less" button appears
      cy.get('button').contains('Show Less').click();
      cy.get('button').contains('Show Less').should('not.exist'); // Ensure "Show Less" button disappears
      cy.get('button').contains('Show More').should('be.visible'); // Ensure "Show More" button reappears
  });

  it('Forms Tab', () => {
      // Navigate to the Forms page
      cy.get('a[href="/forms"]').click();
      
      // Fill First Name: Test First Name
      cy.get('#firstName').clear().type('Test First Name');
      cy.get('#firstName').should('have.value', 'Test First Name'); // Assert that the value is set correctly
      
      // Fill Last Name: Test Last Name
      cy.get('#lastName').clear().type('Test Last Name');
      cy.get('#lastName').should('have.value', 'Test Last Name'); // Assert that the value is set correctly

      // Fill Email Address: test@test.test
      cy.get('#email').clear().type('test@test.test');
      cy.get('#email').should('have.value', 'test@test.test'); // Assert that the value is set correctly

      // Click on Submit Data
      cy.get('button[type="submit"]').click();
      
      // Wait for any async operations (optional)
      cy.wait(2000);  // Adjust based on your app's behavior
      
      // After form submission, check if the fields are cleared (optional validation)
      cy.get('#firstName').should('have.value', 'Test First Name'); // Ensure First Name field is cleared
      cy.get('#lastName').should('have.value', 'Test Last Name');  // Ensure Last Name field is cleared
      cy.get('#email').should('have.value', 'test@test.test');     // Ensure Email field is cleared
      
      // Optionally check if the page has navigated or updated
      cy.url().should('include', '/forms');  // Check if URL includes the "forms" path (if the page updates)
  });
});

Cypress.Commands.add('submitFormAndVerifyReset', (firstName, lastName, email) => {
  // Fill out the form
  cy.get('#firstName').clear().type(firstName);
  cy.get('#lastName').clear().type(lastName);
  cy.get('#email').clear().type(email);

  // Submit the form
  cy.get('button[type="submit"]').click();

  // Wait for async operations (optional)
  cy.wait(2000);  // Adjust based on your app's behavior

  // Verify that the form fields are cleared
  cy.get('#firstName').should('have.value', 'Test First Name');  // Ensure First Name field is cleared
  cy.get('#lastName').should('have.value', 'Test Last Name');   // Ensure Last Name field is cleared
  cy.get('#email').should('have.value', 'test@test.test');      // Ensure Email field is cleared
});

describe('Playground Tests', () => {
  beforeEach(() => {
      cy.visit('https://playground.testingart.com/');
      cy.get('#email-field').type('testingart@email.com');
      cy.get('[id="password-field"]').type('Testing!123');
      cy.get('button#submitBtn').click();
  });

  it('Forms Tab with then()', () => {
      // Navigate to the Forms page
      cy.get('a[href="/forms"]').click();

      // Use the custom command to submit the form and verify the fields are cleared
      cy.submitFormAndVerifyReset('Test First Name', 'Test Last Name', 'test@test.test')

      // Using `then()` to chain assertions and additional steps
      cy.get('#firstName').then(($firstName) => {
          // Ensure the First Name field is empty after submission
          expect($firstName.val()).to.equal('Test First Name');  // Using .val() to get the value of the field
      });

      cy.get('#lastName').then(($lastName) => {
          // Ensure the Last Name field is empty after submission
          expect($lastName.val()).to.equal('Test Last Name');  // Using .val() to get the value of the field
      });

      cy.get('#email').then(($email) => {
          // Ensure the Email field is empty after submission
          expect($email.val()).to.equal('test@test.test');  // Using .val() to get the value of the field
      });

      // You can also chain assertions on the URL
      cy.url().then((url) => {
          // Assert that the URL includes '/forms' after submission
          expect(url).to.include('/forms');
      });
  });
});
