/// <reference types="Cypress" />

describe("Get carbon intensity", () => {
  it("Top 5 regions / fuel type", () => {
    let regions = Cypress._.range(1, 18);
    let topRegions = {};
    cy.wrap(regions)
      .each(region => {
        cy.request(
          `https://api.carbonintensity.org.uk/regional/regionid/${region}`
        ).then(res => {
          let generationMix =
            res["body"]["data"][0]["data"][0]["generationmix"];
          let region = res["body"]["data"][0]["shortname"];

          generationMix.map(item => {
            if (topRegions.hasOwnProperty(item.fuel)) {
              topRegions[item.fuel].push({
                region,
                perc: item.perc
              });
            } else {
              topRegions[item.fuel] = [];
            }
          });
        });
      })
      .then(_ => {
        let fuelTypes = Object.keys(topRegions);
        fuelTypes.forEach(fuel => {
          topRegions[fuel]
            .sort((a, b) => {
              return b.perc - a.perc;
            })
            .splice(5);
        });
        console.log(topRegions);
      });

    cy.log(topRegions);
  });
});
