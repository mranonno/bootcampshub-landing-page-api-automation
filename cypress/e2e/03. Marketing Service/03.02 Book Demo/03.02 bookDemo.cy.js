describe.skip("Post book demo with status code 200", () => {
  it("Should successfully book demo", () => {
    cy.request({
      method: "POST",
      url: "/marketing/book-demo",
      body: {
        email: "afdgdsfg@gmail.com",
        firstName: "fgf",
        lastName: "fds",
        phone: "17635764576",
        about: "gfsdg",
        companyWeb: "rwet",
        companyName: "gfdsg",
        hsCurrentLms: true,
        isReferred: true,
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
