/// <reference types="Cypress" />

describe("Assert generation mix", () => {
  it("sums to 100", () => {
    let regions = Cypress._.range(1, 18);

    cy.wrap(regions).each(region => {
      cy.request(
        `https://api.carbonintensity.org.uk/regional/regionid/${region}`
      ).then(res => {
        let generationMix = res["body"]["data"][0]["data"][0]["generationmix"];

        let generationMixSum = generationMix.reduce((total, item) => {
          return total + item.perc;
        }, 0);

        cy.wrap(generationMixSum).should("equal", 100);
      });
    });
  });
});
