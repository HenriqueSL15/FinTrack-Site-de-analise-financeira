/// <reference types="Cypress" />

before(() => {
  cy.request("POST", `https://fin-track-backend-tests.vercel.app/test/clean`);
});

describe("FinTrack App", () => {
  it("should load the app", () => {
    cy.visit("/");
    cy.get("h1").should("contain", "FinTrack");
  });

  it("should click on register button", () => {
    const button = cy.get("button").contains("Registrar");
    button.click();
    cy.url().should("include", "/register");
  });

  it("should register a new user", () => {
    const nameField = cy.get("[data-testid='nameField']");
    const emailField = cy.get("[data-testid='emailField']");
    const passwordField = cy.get("[data-testid='passwordField']");
    const registerButton = cy.get("[data-testid='registerButton']").click();

    nameField.type("cypress");
    emailField.type("cypress@cypress.com");
    passwordField.type("Cypress1*");

    registerButton.click();

    cy.url().should("include", "/login");
    cy.get("[data-testid='loginButton']").should("exist");
  });

  it("should login into the account that was just created", () => {
    const emailField = cy.get("[data-testid='emailField']");
    const passwordField = cy.get("[data-testid='passwordField']");
    const loginButton = cy.get("[data-testid='loginButton']");

    emailField.type("cypress@cypress.com");
    passwordField.type("Cypress1*");
    loginButton.click();
    cy.get("[data-testid='logoutButton']").should("exist");
  });

  it('should click on the "Cypress" to go to the user page', () => {
    const userPageButton = cy.get("[data-testid='userPageButton']");
    userPageButton.click();
    cy.url().should("include", "/dashboard");
  });

  it("should create a category called 'Salary'", () => {
    const newCategoryButton = cy.get("[data-testid='newCategoryButton']");
    newCategoryButton.click();

    const incomeRadioButton = cy.get("[data-testid='income']");
    const categoryNameField = cy.get("[data-testid='categoryDescription']");
    const saveButton = cy.get("[data-testid='saveButton']");

    incomeRadioButton.click();
    categoryNameField.type("Salary");
    saveButton.click();

    cy.get("#radix-«r6»").should("not.exist");
  });

  it("should create a category called 'Rent'", () => {
    const newCategoryButton = cy.get("[data-testid='newCategoryButton']");
    newCategoryButton.click();

    const incomeRadioButton = cy.get("[data-testid='expense']");
    const categoryNameField = cy.get("[data-testid='categoryDescription']");
    const saveButton = cy.get("[data-testid='saveButton']");

    incomeRadioButton.click();
    categoryNameField.type("Rent");
    saveButton.click();

    cy.get("#radix-«r6»").should("not.exist");
  });

  it("should create a new transaction with 'Salary' category and R$900 as amount", () => {
    const newTransactionButton = cy.get("[data-testid='newTransactionButton']");
    newTransactionButton.click();

    const descriptionField = cy.get("[data-testid='transactionDescription']");
    const amountField = cy.get("[data-testid='transactionAmount']");
    const categorySelect = cy.get('[data-testid="transactionCategory"]');
    const saveTransactionButton = cy.get("[data-testid='saveButton']");

    descriptionField.type("Salary of the month");

    amountField.type("900");

    categorySelect.click();
    cy.get("[data-testid='categoryItem-Salary']").click();

    saveTransactionButton.click();

    cy.get("#radix-«r6»").should("not.exist");

    cy.get("[data-testid='transactionRow-0-transactionDescription']").should(
      "contain",
      "Salary of the month"
    );

    cy.get("[data-testid='transactionRow-0-transactionCategory']").should(
      "contain",
      "Salary"
    );

    cy.get("[data-testid='transactionRow-0-transactionAmount']").should(
      "contain",
      "900,00"
    );
  });

  it("should create a new transaction with 'Rent' category and R$500 as amount", () => {
    const newTransactionButton = cy.get("[data-testid='newTransactionButton']");
    newTransactionButton.click();

    const descriptionField = cy.get("[data-testid='transactionDescription']");
    const amountField = cy.get("[data-testid='transactionAmount']");
    const categorySelect = cy.get(`[data-testid="transactionCategory"]`);
    const saveTransactionButton = cy.get("[data-testid='saveButton']");

    descriptionField.type("Rent of the month");

    amountField.type("500");

    categorySelect.click();
    cy.get("[data-testid='categoryItem-Rent']").click();

    saveTransactionButton.click();
  });
});
