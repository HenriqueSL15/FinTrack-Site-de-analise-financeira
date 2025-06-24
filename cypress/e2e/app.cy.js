describe("FinTrack App", () => {
  it("should load the app", () => {
    cy.visit("/");
    cy.get("h1").should("contain", "FinTrack");
  });

  it("should click on register button", () => {
    const button = cy.get("#registerButton");
    button.click();
    cy.url().should("include", "/register");
  });

  it("should register a new user", () => {
    const nameField = cy.get("#nameField");
    const emailField = cy.get("#emailField");
    const passwordField = cy.get("#passwordField");
    const registerButton = cy.get("#registerButton").click();

    nameField.type("cypress");
    emailField.type("cypress@cypress.com");
    passwordField.type("Cypress1*");

    registerButton.click();
  });
});
