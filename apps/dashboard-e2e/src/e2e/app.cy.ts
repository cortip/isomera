import { getGreeting } from '../support/app.po';

describe('ui', () => {
  beforeEach(() =>
    cy.visit('/', {
      headers: { 'Accept-Encoding': 'gzip, deflate' },
      timeout: 15000,
    })
  );

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Sign in');
  });
});
