describe("Appointment", () => {
  it("Should book an interview", () => {
    cy.request("GET", "/api/debug/reset");
    cy.wait(1000);
    //1. visits root
    cy.visit("/");
    //2.Clicks on the "Add" button in the second appointment
    cy.wait(1000);
    cy.get(
      ":nth-child(2) > .appointment__add > .appointment__add-button"
    ).click();
    //3.Enters their name
    cy.wait(1000);
    cy.get("[data-testid=student-name-input]").type("Mr. Popo");
    //4.Chooses an interviewer
    cy.wait(1000);
    cy.get(":nth-child(1) > .interviewers__item-image").click();
    //5.Clicks the save button
    cy.wait(1000);
    cy.get(".button--confirm").click();
    //6.Sees the booked appointment
    cy.get(":nth-child(2) > .appointment__card").should(
      "have.class",
      "appointment__card--show"
    );
    cy.contains(".appointment__card--show", "Mr. Popo");
  });

  it("Should edit an interview", () => {
    cy.wait(1000);
    //1. Visits the root of our web server
    cy.visit("/");
    //2. Clicks the edit button for the existing appointment
    cy.wait(1000);
    cy.get(
      ':nth-child(2) > .appointment__card > .appointment__card-right > .appointment__actions > [src="images/edit.png"]'
    )
      .invoke("show")
      .click();
    //3. Changes the name and interviewer
    cy.wait(1000);
    cy.get("[data-testid=student-name-input]").type(" The greatest of all");
    cy.wait(1000);
    cy.get(":nth-child(2) > .interviewers__item-image").click();
    //4. Clicks the save button
    cy.wait(1000);
    cy.get(".button--confirm").click();
    //5. Sees the edit to the appointment
    cy.get(":nth-child(2) > .appointment__card").should(
      "have.class",
      "appointment__card--show"
    );
    cy.contains(".appointment__card--show", "Mr. Popo The greatest of all");
  });

  it("Should cancel an interview", () => {
    cy.wait(1000);
    // 1.Visits the root of our web server
    cy.visit("/");
    // 2.Clicks the delete button for the existing appointment
    cy.get(
      ':nth-child(2) > .appointment__card > .appointment__card-right > .appointment__actions > [src="images/trash.png"]'
    )
      .invoke("show")
      .click();
    // 3.Clicks the confirm button
    cy.wait(1000);
    cy.get(
      ".appointment__card > .appointment__actions > :nth-child(2)"
    ).click();
    // 4.Sees that the appointment slot is empty
    cy.get(":nth-child(2) > .appointment__add").should(
      "have.class",
      "appointment__add"
    );
  });
});
