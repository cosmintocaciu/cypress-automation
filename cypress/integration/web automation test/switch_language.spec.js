/// <reference types="Cypress" />

describe("Switch language", () => {
  beforeEach(() => {
    cy.visit("http://sports.williamhill.com/betting/en-gb");
  });

  it("Join button is visible", () => {
    cy.get("#joinLink").should("be.visible");
  });

  it("Button is translated", () => {
    const languages = [
      { id: "#de", translation: "Anmelden" },
      { id: "#ja", translation: "登録" },
      { id: "#el", translation: "Εγγραφή" }
    ];

    cy.wrap(languages).each(language => {
      cy.get(".js-language-list").invoke("show");

      cy.get(language.id).click();

      cy.get("#joinLink")
        .should("be.visible")
        .and("have.text", language.translation);
    });
  });
});
