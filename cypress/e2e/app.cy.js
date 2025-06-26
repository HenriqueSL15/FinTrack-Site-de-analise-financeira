/// <reference types="cypress" />

before(() => {
  cy.request("POST", `https://fin-track-backend-tests.vercel.app/test/clean`);

  Cypress.on("uncaught:exception", (err) => {
    if (err.message.includes("ResizeObserver")) {
      return false; // Ignora o erro
    }
  });
});

describe("FinTrack App", () => {
  it("should load the app", () => {
    cy.visit("/");
    cy.get("h1").should("contain", "FinTrack");
  });

  it("should click on register button", () => {
    cy.get("#registerButton").click();

    cy.url().should("include", "/register");
  });

  it("should register a new user", () => {
    cy.get("#nameField").type("cypress");
    cy.get("#emailField").type("cypress@cypress.com");
    cy.get("#passwordField").type("Cypress1*");
    cy.get("#registerButton").click();

    cy.url().should("include", "/login");
    cy.get("#loginButton").should("exist");
  });

  it("should login into the account that was just created", () => {
    cy.get("#emailField").type("cypress@cypress.com");
    cy.get("#passwordField").type("Cypress1*");
    cy.get("#loginButton").click();

    cy.get("#logoutButton").should("exist");
  });

  it('should click on the "Cypress" to go to the user page', () => {
    cy.get("#userPageButton").click();

    cy.url().should("include", "/dashboard");
  });

  it("should create a category called 'Salary'", () => {
    cy.get("#newCategoryButton").click();

    cy.get("#income").click();
    cy.get("#categoryDescription").type("Salary");
    cy.get("#saveButton").click();

    cy.get("#radix-«r6»").should("not.exist");
  });

  it("should create a category called 'Rent'", () => {
    cy.get("#newCategoryButton").click();

    cy.get("#expense").click();
    cy.get("#categoryDescription").type("Rent");
    cy.get("#saveButton").click();

    cy.get("#radix-«r6»").should("not.exist");
  });

  it("should create a new transaction with 'Salary' category and R$900 as amount", () => {
    cy.get("#newTransactionButton").click();

    cy.get("#transactionDescription").type("Salary of the month");
    cy.get("#transactionAmount").type("900");
    cy.get("#transactionCategory").click();

    cy.get("#categoryItem-Salary").click();

    cy.get("#saveButton").click();

    cy.get("#radix-«r6»").should("not.exist");

    cy.get("[data-testid='transactionRow-0-description']").should(
      "contain",
      "Salary of the month"
    );

    cy.get("[data-testid='transactionRow-0-category']").should(
      "contain",
      "Salary"
    );

    cy.get("[data-testid='transactionRow-0-amount']").should(
      "contain",
      "900,00"
    );
  });

  it("should create a new transaction with 'Rent' category and R$500 as amount", () => {
    cy.get("#newTransactionButton").click();

    cy.get("#transactionDescription").type("Rent of the month");
    cy.get("#transactionAmount").type("500");
    cy.get(`#transactionCategory`).click();
    cy.get("#categoryItem-Rent").click();

    cy.get("#saveButton").click();

    cy.get("#radix-«r6»").should("not.exist");

    cy.get("[data-testid='transactionRow-0-description']").should(
      "contain",
      "Rent of the month"
    );

    cy.get("[data-testid='transactionRow-0-category']").should(
      "contain",
      "Rent"
    );

    cy.get("[data-testid='transactionRow-0-amount']").should(
      "contain",
      "500,00"
    );
  });

  it("should go back to the dashboard and see the current values of the cards", () => {
    cy.get("#dashboardPageButton").click();

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
    cy.get("#budgetsPageButton").click();

    cy.get(".text-3xl").should("exist");
  });

  it("should create a new budget", () => {
    cy.get("#newBudgetButton").click();

    cy.get("#selectCategory").click();

    cy.get("#categoryItem-Rent").click();

    cy.get("#budgetLimit").clear().type("900");

    cy.get("#saveButton").click();

    cy.get("#saveButton").should("not.exist");
  });

  it("should see the budget card and with the correct values", () => {
    cy.get("[data-testid='budgetCard-0']").should("exist");
    cy.get("[data-testid='budgetCard-0-title']").should("contain", "Rent");
    cy.get("[data-testid='budgetCard-0-percentage']").should("contain", "56%");
    cy.get("[data-testid='budgetCard-0-amount']").should("contain", "900,00");
    cy.get("[data-testid='budgetCard-0-spent']").should("contain", "500,00");
    cy.get("[data-testid='budgetCard-0-remaining']").should(
      "contain",
      "400,00"
    );
  });

  it("should go to reports", () => {
    cy.get("#reportsPageButton").click();

    cy.window().then((win) => {
      const chartInstance = win.incomeVsExpenseChart;
      expect(chartInstance).to.exist;

      const receitas = chartInstance.data.datasets[0].data[0];
      const despesas = chartInstance.data.datasets[1].data[0];

      expect(receitas).to.equal(900);
      expect(despesas).to.equal(500);
    });
  });
});
