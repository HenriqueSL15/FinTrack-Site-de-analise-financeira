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

  it("should go to the transactions page", () => {
    cy.get("#transactionsPageButton").click();
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

  it("should create a category called 'Food'", () => {
    cy.get("#newCategoryButton").click();

    cy.get("#expense").click();
    cy.get("#categoryDescription").type("Food");
    cy.get("#saveButton").click();

    cy.get("#radix-«r6»").should("not.exist");
  });

  it("should create a new transaction with 'Salary' category and R$10000 as amount", () => {
    cy.get("#newTransactionButton").click();

    cy.get("#transactionDescription").type("Salary of the month");
    cy.get("#transactionAmount").type("10000");

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
      "10.000,00"
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

  it("should create a new transaction with 'Food' category and R$175 as amount", () => {
    cy.get("#newTransactionButton").click();

    cy.get("#transactionDescription").type("Groceries of the week");
    cy.get("#transactionAmount").type("175");
    cy.get(`#transactionCategory`).click();
    cy.get("#categoryItem-Food").click();

    cy.get("#saveButton").click();

    cy.get("#radix-«r6»").should("not.exist");

    cy.get("[data-testid='transactionRow-0-description']").should(
      "contain",
      "Groceries of the week"
    );

    cy.get("[data-testid='transactionRow-0-category']").should(
      "contain",
      "Food"
    );

    cy.get("[data-testid='transactionRow-0-amount']").should(
      "contain",
      "175,00"
    );
  });

  it("should go back to the dashboard and see the current values of the cards", () => {
    cy.get("#dashboardPageButton").click();

    cy.get("[data-testid='financialCard-0']").within(() => {
      cy.get("[data-testid='financialCardValue']").should(
        "contain",
        "9.325,00"
      );
    });

    cy.get("[data-testid='financialCard-1']").within(() => {
      cy.get("[data-testid='financialCardValue']").should(
        "contain",
        "10.000,00"
      );
    });

    cy.get("[data-testid='financialCard-2']").within(() => {
      cy.get("[data-testid='financialCardValue']").should("contain", "675,00");
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

  it("should go to the reports page", () => {
    cy.get("#reportsPageButton").click();
  });

  it("should see correct values in the expenses per category chart", () => {
    cy.window().then((win) => {
      const chartInstance = win.categoryReportChart;
      expect(chartInstance).to.exist;

      const labels = chartInstance.data.labels;
      const data = chartInstance.data.datasets[0].data;

      const rentIndex = labels.indexOf("Rent");
      const foodIndex = labels.indexOf("Food");

      if (rentIndex !== -1) {
        expect(data[rentIndex]).to.equal(500);
      }

      if (foodIndex !== -1) {
        expect(data[foodIndex]).to.equal(175);
      }
    });
  });

  it("should see the income vs expense chart with the correct values", () => {
    cy.get("#incomeVsExpenseReportButton").click();

    cy.window().then((win) => {
      const chartInstance = win.incomeVsExpenseChart;
      expect(chartInstance).to.exist;

      const receitas = chartInstance.data.datasets[0].data[0];
      const despesas = chartInstance.data.datasets[1].data[0];

      expect(receitas).to.equal(10000);
      expect(despesas).to.equal(675);
    });
  });

  it("should go to the goals page", () => {
    cy.get("#goalsPageButton").click();
  });

  it("should create a new goal with the name 'Laptop' and value '4000' (BRL)", () => {
    cy.get("#newGoalButton").click();

    cy.get("#goalName").type("Laptop");
    cy.get("#goalAmount").type("4000");

    const date = new Date();
    date.setMonth(date.getMonth() + 1);

    const daysDifference = Math.round(
      (date - new Date()) / (1000 * 60 * 60 * 24)
    );

    cy.get("#goalDate").type(date.toISOString().split("T")[0]);

    cy.get("#saveButton").click();

    cy.get("[data-testid='goalCard-0']")
      .should("exist")
      .within(() => {
        cy.get("[data-testid='goalTitle']").should("have.text", "Laptop");
        cy.get("[data-testid='goalPercentage']").should(
          "have.text",
          "0% utilizado"
        );
        cy.get("[data-testid='goalAmount']").should("include.text", "4.000,00");
        cy.get("[data-testid='goalSpent']").should("include.text", "0,00");
        cy.get("[data-testid='goalDays']").should(
          "include.text",
          `${daysDifference}`
        );
      });
  });

  it("should update the goal with a new Title, Amount and Current Amount", () => {
    cy.get("#updateGoalButton").click();

    cy.get("#goalName").type("Laptop Gamer");
    cy.get("#goalAmount").clear().type("3800");
    cy.get("#goalCurrentAmount").type("225");
    cy.get("#saveButton").click();

    cy.get("[data-testid='goalTitle']").should("have.text", "Laptop Gamer");
    cy.get("[data-testid='goalPercentage']").should("include.text", "6%");
    cy.get("[data-testid='goalAmount']").should("include.text", "3.800");
  });

  it("should update the goal to complete the target amount", () => {
    cy.get("#updateGoalButton").click();

    cy.get("#goalCurrentAmount").clear().type("3800");
    cy.get("#saveButton").click();

    cy.get("[data-testid='goalPercentage']").should("include.text", "100%");
    cy.get("[data-testid='goalAmount']").should("include.text", "3.800");
    cy.get("#deleteGoalButton").should("be.visible");
  });

  it("should delete the completed goal and it's statistics should stay in the dashboard", () => {
    cy.get("#deleteGoalButton").click();

    cy.get("#dashboardPageButton").click();

    cy.get("[data-testid='financialCard-3']")
      .should("exist")
      .within(() => {
        cy.get("[data-testid='financialCardValue']").should(
          "include.text",
          "3.800"
        );
      });
  });

  it("should go back to the Goals page and create a new 'example' Goal (with it's limit day being today)", () => {
    cy.get("#goalsPageButton").click();

    cy.get("#newGoalButton").click();

    cy.get("#goalName").type("Example");
    cy.get("#goalAmount").type("1200");

    cy.get("#goalDate").type(new Date().toISOString().split("T")[0]);

    cy.get("#saveButton").click();

    cy.get('[data-testid="goalCard-0"]').within(() => {
      cy.get('[data-testid="goalAmount"]').should("include.text", "1.200");
      cy.get('[data-testid="goalDate"]').should(
        "include.text",
        new Date().toISOString().split("T")[0].split("-").reverse().join("/")
      );
    });
  });

  it("should delete the 'example' Goal", () => {
    cy.get("#deleteGoalButton").click();
    cy.wait(2000);
  });

  it("should create a new 'example 2' Goal", () => {
    cy.get("#newGoalButton").click();

    cy.get("#goalName").type("Example 2");
    cy.get("#goalAmount").type("500");

    const date = new Date();
    console.log(date.getTime(), date.getDate());
    date.setDate(date.getDate() + 1);

    cy.get("#goalDate").type(date.toISOString().split("T")[0]);

    cy.get("#saveButton").click();

    cy.wait(2000);

    cy.get("[data-testid='goalCard-0']")
      .should("exist")
      .within(() => {
        cy.get("[data-testid='goalTitle']").should("have.text", "Example 2");
        cy.get("[data-testid='goalPercentage']").should(
          "have.text",
          "0% utilizado"
        );
        cy.get("[data-testid='goalAmount']").should("include.text", "500,00");
        cy.get("[data-testid='goalSpent']").should("include.text", "0,00");
      });
  });

  it("should update 'example 2' Goal with a higher current amount and delete it from inside of the update form", () => {
    cy.get("#updateGoalButton").click();

    cy.get("#goalCurrentAmount").clear().type(250);
    cy.get("#saveButton").click();

    cy.wait(2000);

    cy.get("#updateGoalButton").click();
    cy.get("#deleteGoalButton").click();
  });

  it("should go to the dashboard page and see if the values are correct", () => {
    cy.get("#dashboardPageButton").click();

    cy.get('[data-testid="financialCard-0"]').within(() => {
      cy.get("[data-testid='financialCardValue']").should(
        "include.text",
        "5.525"
      );
    });

    cy.get('[data-testid="financialCard-1"]').within(() => {
      cy.get("[data-testid='financialCardValue']").should(
        "include.text",
        "10.000"
      );
    });

    cy.get('[data-testid="financialCard-2"]').within(() => {
      cy.get("[data-testid='financialCardValue']").should(
        "include.text",
        "675"
      );
    });

    cy.get('[data-testid="financialCard-3"]').within(() => {
      cy.get("[data-testid='financialCardValue']").should(
        "include.text",
        "3.800"
      );
    });
  });

  it("see the chart values", () => {
    cy.window().then((win) => {
      const chartInstance = win.areaChart;
      expect(chartInstance).to.exist;

      expect(chartInstance.data.labels).to.deep.equal([
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ]);
      expect(chartInstance.data.datasets[0].data).to.deep.equal([
        10000, 0, 0, 0, 0, 0,
      ]);
      expect(chartInstance.data.datasets[1].data).to.deep.equal([
        675, 0, 0, 0, 0, 0,
      ]);
    });
  });

  it("should go to settings page and update the currency to 'EUR'", () => {
    cy.get("#settingsPageButton").click();

    cy.get("#selectCurrency").click();
    cy.get("#eur").click();
    cy.wait(2000);

    cy.get("#saveButton").click();

    cy.reload();

    cy.get("#dashboardPageButton").click();

    cy.get("[data-testid='financialCard-0']").within(() => {
      cy.get("[data-testid='financialCardValue']").should(
        "include.text",
        "861,73"
      );
    });

    cy.get("[data-testid='financialCard-1']").within(() => {
      cy.get("[data-testid='financialCardValue']").should(
        "include.text",
        "1.559,70"
      );
    });

    cy.get("[data-testid='financialCard-2']").within(() => {
      cy.get("[data-testid='financialCardValue']").should(
        "include.text",
        "105,28"
      );
    });

    cy.get("[data-testid='financialCard-3']").within(() => {
      cy.get("[data-testid='financialCardValue']").should(
        "include.text",
        "592,69"
      );
    });
  });

  it("should go to settings page and update the currency to 'USD'", () => {
    cy.get("#settingsPageButton").click();

    cy.get("#selectCurrency").click();
    cy.get("#usd").click();

    cy.get("#saveButton").click();

    cy.reload();

    cy.get("#dashboardPageButton").click();

    cy.get("[data-testid='financialCard-0']").within(() => {
      cy.get("[data-testid='financialCardValue']").should(
        "include.text",
        "1.017,71"
      );
    });

    cy.get("[data-testid='financialCard-1']").within(() => {
      cy.get("[data-testid='financialCardValue']").should(
        "include.text",
        "1.842,00"
      );
    });

    cy.get("[data-testid='financialCard-2']").within(() => {
      cy.get("[data-testid='financialCardValue']").should(
        "include.text",
        "124,34"
      );
    });

    cy.get("[data-testid='financialCard-3']").within(() => {
      cy.get("[data-testid='financialCardValue']").should(
        "include.text",
        "699,96"
      );
    });
  });

  it("should go back to the dashboard and logout", () => {
    cy.get("#homePageButton").click();

    cy.get("#logoutButton").click();
  });
});
