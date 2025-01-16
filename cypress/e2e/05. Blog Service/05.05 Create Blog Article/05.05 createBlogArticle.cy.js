const { faker } = require("@faker-js/faker");
describe("Create a blog articles with status code 200", () => {
  let accessToken;
  before(() => {
    cy.readFile("cypress/fixtures/userToken.json").then((data) => {
      accessToken = data.userAccessToken;
    });
  });

  it("Checking if should be able to create blog article", () => {
    cy.request({
      method: "POST",
      url: "/blog/article/create",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        title: faker.lorem.words(5),
        description: faker.lorem.sentence(2),
        thumbnail:
          "https://ts4uportal-all-files-upload.nyc3.digitaloceanspaces.com/program-user-image/1737012626307-Space-Gray-Apple-Laptop-Mockup.jpg",
        tags: [],
        metaDescription: "meta description",
        metaTitle: "meta title",
        category: "665490b8c4c4180020e11228",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200, "Expected status code is 200");
      if (response.status === 200) {
        const { body, duration } = response;
        cy.writeFile("cypress/fixtures/articleId.json", {
          articleId: body.article._id,
        });
        cy.writeFile("cypress/fixtures/articleSlug.json", {
          articleSlug: body.article.slug,
        });
        expect(body.success).to.eq(true);
        expect(duration).to.be.lessThan(
          2000,
          "Response time should be less than 2 seconds"
        );
        cy.log("Response body (stringified):", JSON.stringify(body, null, 2));
        console.log(
          "Response body (stringified):",
          JSON.stringify(body, null, 2)
        );
      } else {
        cy.log("Request failed with status code:", response.status);
        cy.log(
          "Error details:",
          response.body.error || "No error details provided"
        );
      }
    });
  });
});
