let accessToken;
let articleId;
let commentId;
describe("Update article comment with status code 200", () => {
  before(() => {
    cy.readFile("cypress/fixtures/userToken.json").then((data) => {
      accessToken = data.userAccessToken;
    });
    cy.readFile("cypress/fixtures/articleId.json").then((article) => {
      articleId = article.articleId;
    });
    cy.readFile("cypress/fixtures/commentId.json").then((comment) => {
      commentId = comment.commentId;
    });
  });
  it("Checking if should be able to Update article comment", () => {
    cy.request({
      method: "PATCH",
      url: `/content/comment/update/${commentId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        contentId: articleId,
        comment: "Nice Blogs update",
        parentId: "",
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
