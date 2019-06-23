/// <reference types="Cypress" />

describe("Carbon Intensity", () => {
  it("Forecast Sorted", () => {
    let regions = Cypress._.range(1, 18);
    let forecast = [];

    cy.wrap(regions)
      .each(region => {
        cy.request(
          `https://api.carbonintensity.org.uk/regional/regionid/${region}`
        ).then(res => {
          forecast.push({
            forecast:
              res["body"]["data"][0]["data"][0]["intensity"]["forecast"],
            region: res["body"]["data"][0]["shortname"]
          });
        });
      })
      .then(_ => {
        console.table(
          forecast.sort((a, b) => {
            return b.forecast - a.forecast;
          })
        );
      });

    cy.log(forecast);
  });
});
