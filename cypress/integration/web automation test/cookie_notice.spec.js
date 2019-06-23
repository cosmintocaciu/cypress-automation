/// <reference types="Cypress" />

describe("Cookie notice pop-up", () => {
  it("Cookie Notice Shown", () => {
    cy.visit("http://sports.williamhill.com/betting/en-gb");

    cy.get(".cookie-disclaimer", { timeout: 60000 }).should("be.visible");

    cy.get(".cookie-disclaimer__button").click();

    cy.getCookie("cdb").should("exist");
  });
});
