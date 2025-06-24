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

    cy.url().should("include", "/login");
    cy.get("#loginButton").should("exist");
  });

  it("should login into the account that was just created", () => {
    const emailField = cy.get("#emailField");
    const passwordField = cy.get("#passwordField");
    const loginButton = cy.get("#loginButton");

    emailField.type("cypress@cypress.com");
    passwordField.type("Cypress1*");
    loginButton.click();
    cy.get("#logoutButton").should("exist");
  });

  it('should click on the "Cypress" to go to the user page', () => {
    const userPageButton = cy.get("#userPageButton");
    userPageButton.click();
    cy.url().should("include", "/dashboard");
  });

  it("should create a category called 'Salary'", () => {
    const newCategoryButton = cy.get("#newCategoryButton");
    newCategoryButton.click();

    const incomeRadioButton = cy.get("#income");
    const categoryNameField = cy.get("#categoryDescription");
    const saveButton = cy.get("#saveButton");

    incomeRadioButton.click();
    categoryNameField.type("Salary");
    saveButton.click();

    cy.get("#radix-«r6»").should("not.exist");
  });

  it("should create a category called 'Rent'", () => {
    const newCategoryButton = cy.get("#newCategoryButton");
    newCategoryButton.click();

    const incomeRadioButton = cy.get("#expense");
    const categoryNameField = cy.get("#categoryDescription");
    const saveButton = cy.get("#saveButton");

    incomeRadioButton.click();
    categoryNameField.type("Rent");
    saveButton.click();

    cy.get("#radix-«r6»").should("not.exist");
  });

  it("should create a new transaction with 'Salary' category and R$900 as amount", () => {
    const newTransactionButton = cy.get("#newTransactionButton");
    newTransactionButton.click();

    const descriptionField = cy.get("#transactionDescription");
    const amountField = cy.get("#transactionAmount");
    const categorySelect = cy.get("#transactionCategory");
    const saveTransactionButton = cy.get("#saveButton");

    descriptionField.type("Salary of the month");

    amountField.type("900");

    categorySelect.click();
    cy.get("#categoryItem-Salary").click();

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
    const newTransactionButton = cy.get("#newTransactionButton");
    newTransactionButton.click();

    const descriptionField = cy.get("#transactionDescription");
    const amountField = cy.get("#transactionAmount");
    const categorySelect = cy.get(`#transactionCategory`);
    const saveTransactionButton = cy.get("#saveButton");

    descriptionField.type("Rent of the month");

    amountField.type("500");

    categorySelect.click();
    cy.get("#categoryItem-Rent").click();

    saveTransactionButton.click();

    cy.get("#radix-«r6»").should("not.exist");

    cy.get("[data-testid='transactionRow-0-transactionDescription']").should(
      "contain",
      "Rent of the month"
    );

    cy.get("[data-testid='transactionRow-0-transactionCategory']").should(
      "contain",
      "Rent"
    );

    cy.get("[data-testid='transactionRow-0-transactionAmount']").should(
      "contain",
      "500,00"
    );
  });

  it("should go back to the dashboard and see the current values of the cards", () => {
    const dashboardButton = cy.get("#dashboardPageButton");
    dashboardButton.click();

    cy.get("[data-testid='financialCard-0']").within(() => {
      cy.get("[data-testid='financialCardValue']").should("contain", "400,00");
    });

    cy.get("[data-testid='financialCard-1']").within(() => {
      cy.get("[data-testid='financialCardValue']").should("contain", "900,00");
    });

    cy.get("[data-testid='financialCard-2']").within(() => {
      cy.get("[data-testid='financialCardValue']").should("contain", "500,00");
    });
  });

  it("should go to the budget's page", () => {
    const budgetsButton = cy.get("#budgetsPageButton");
    budgetsButton.click();

    cy.get(".text-3xl").should("exist");
  });

  it("should create a new budget", () => {
    const newBudgetButton = cy.get("#newBudgetButton");
    newBudgetButton.click();

    cy.wait(1000);

    const budgetCategorySelect = cy.get("#selectCategory");
    budgetCategorySelect.click();

    const rentCategory = cy.get("#categoryItem-Rent");
    rentCategory.click();

    const budgetLimitInput = cy.get("#budgetLimit");
    budgetLimitInput.type("900");

    const saveButton = cy.get("#saveButton");
    saveButton.click();

    saveButton.should("not.exist");
  });
});
