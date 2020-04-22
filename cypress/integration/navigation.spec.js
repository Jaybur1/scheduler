describe("Navigation", () => {
  it("Should reset the db", () => {
    cy.visit("/api/debug/reset");
  });

  it("Should navigate to Tuesday", () => {
    cy.wait(1000);
    cy.visit("/");
    cy.wait(1000);
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});
