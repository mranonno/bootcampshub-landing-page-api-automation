let accessToken;
let articleId;
describe("Edit single article with status code 200", () => {
  before(() => {
    cy.readFile("cypress/fixtures/userToken.json").then((data) => {
      accessToken = data.userAccessToken;
    });
    cy.readFile("cypress/fixtures/articleId.json").then((article) => {
      articleId = article.articleId;
    });
  });
  it("Checking if should be able to edit single article", () => {
    cy.request({
      method: "PATCH",
      url: `/blog/article/edit/${articleId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        title: "Rick McDermott",
        description: "This is for the SchoolsHub API testing updating",
        thumbnail:
          "https://ts4uportal-all-files-upload.nyc3.digitaloceanspaces.com/program-user-image/1716847702587-thumnail.jpeg",
        tags: ["webdev", "javascript", "programming", "react"],
        metaDescription: "meta description",
        metaTitle: "meta title name",
        category: {
          icon: "FaCodepen",
          _id: "665490b8c4c4180020e11228",
          name: "Coding",
          slug: "Coding-V_n1e2IBy",
        },
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200, "Expected status code is 200");
      if (response.status === 200) {
        const { body, duration } = response;
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
