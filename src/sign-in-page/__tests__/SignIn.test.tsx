import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";
import { renderWithRouter } from "../../utils/test-utils";

describe("Test Sign In page", () => {
  describe("Given user is on sign in page", () => {
    describe("When user enters invalid email", () => {
      it("Users sees 'Invalid Email address' message is rendered", () => {
        renderWithRouter(<App />, { route: "/" });
        const email = screen.getByLabelText("Email address");
        userEvent.type(email, "test@.example.com");
        email.blur();
        expect(screen.getByText("Invalid Email address")).toBeInTheDocument();
      });
    });
    describe("When user enters valid email & password", () => {
      it("User is redirected to protected page", async () => {
        renderWithRouter(<App />, { route: "/" });
        userEvent.type(
          screen.getByLabelText("Email address"),
          "test@example.com"
        );
        userEvent.type(screen.getByLabelText("Password"), "abcdefgh");
        const continueBtn = screen.getByRole("button");
        userEvent.click(continueBtn);
        expect(
          await screen.findByText("User is on protected page")
        ).toBeInTheDocument();
      });
    });
  });
});
