describe("template spec", () => {
	it("passes", () => {
		cy.visit("/");
	});

	it("dobavit", () => {
		cy.visit("/");
		cy.get(".btn-d").last().click();
		cy.get(".modal-title").should(
			"have.text",
			"Blue Cheese Burger"
		);
		cy.get(".fm-dobavit").click();

		//navigated to login
		cy.get("button").should("have.text", "Login");

		// do login
		cy.get("input").first().type("a_hakimov");
		cy.get("input").last().type("1234");
		cy.get("button").click();

		// check navigation to homepage
		cy.get("h1").should(
			"have.text",
			"Только самые сочные бургеры!"
		);

		// pizza zakaz berish
		cy.contains("Pizza").click();
		cy.get("h3").last().should("have.text", "BBQ Chicken Pizza");
		cy.get(".btn-d").last().click();
		cy.get(".fm-dobavit").click();

		// zakaz oformleniye
		cy.contains("Оформить заказ").click();
		cy.contains("Самовывоз").parent().click();
		cy.wait(1000);
		cy.get(".sm-oformit").click();
		cy.contains("Order sent successfully");
	});
});
