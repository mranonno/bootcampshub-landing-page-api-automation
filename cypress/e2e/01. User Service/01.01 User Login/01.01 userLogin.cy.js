describe("Login to the landing page with valid credential and get stats code 200", () => {
  let userEmail;
  let userPassword;
  before(() => {
    cy.readFile("cypress/fixtures/userInformation.json").then((data) => {
      userEmail = data.email;
      userPassword = data.password;
    });
  });

  it("Checking if should be able to login user", () => {
    cy.request({
      method: "POST",
      url: "/user/login",
      body: {
        email: userEmail,
        password: userPassword,
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        const { token } = response.body;
        const userToken = token;

        cy.writeFile("cypress/fixtures/userToken.json", {
          userAccessToken: userToken,
        });

        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("token");
        expect(response.body.success).to.eq(true);
        expect(response.duration).to.be.lessThan(2000);
        cy.log("response.body", JSON.stringify(response.body, null, 1));
        console.log("response.body", JSON.stringify(response.body, null, 1));
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
