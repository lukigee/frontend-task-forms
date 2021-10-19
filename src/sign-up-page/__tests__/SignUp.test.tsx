import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";
import { renderWithRouter } from "../../utils/test-utils";

describe("Test Sign Up page", () => {
  describe("Given user is on sign up page", () => {
    describe("When user interacts with email input field", () => {
      describe("And does not enter any characters", () => {
        it("Users sees message 'Email is required'", () => {
          renderWithRouter(<App />, { route: "/signup" });
          const email = screen.getByLabelText("Email address");
          email.focus();
          email.blur();
          expect(screen.getByText("Email is required")).toBeInTheDocument();
        });
      });
      describe("And users enters invalid email address", () => {
        it("Users sees 'Invalid Email address' message", () => {
          renderWithRouter(<App />, { route: "/signup" });
          const email = screen.getByLabelText("Email address");
          userEvent.type(email, "test@.example.com");
          email.blur();
          expect(screen.getByText("Invalid Email address")).toBeInTheDocument();
        });
      });
    });
    describe("When user interacts to full name field", () => {
      describe("And does not enter any characters", () => {
        it("Users sees message 'Full name is required'", () => {
          renderWithRouter(<App />, { route: "/signup" });
          const fullname = screen.getByLabelText("Full Name");
          fullname.focus();
          fullname.blur();
          expect(screen.getByText("Full name is required")).toBeInTheDocument();
        });
      });
      describe("And only provides name", () => {
        it("Users sees 'Missing last name' error message", () => {
          renderWithRouter(<App />, { route: "/signup" });
          const fullname = screen.getByLabelText("Full Name");
          userEvent.type(fullname, "John");
          fullname.blur();
          expect(screen.getByText("Missing last name")).toBeInTheDocument();
        });
      });
    });

    describe("When user interacts to password field", () => {
      describe("And does not enter any characters", () => {
        it("Users sees message 'Password is required'", () => {
          renderWithRouter(<App />, { route: "/signup" });
          const password = screen.getByLabelText("Password");
          password.focus();
          password.blur();
          expect(screen.getByText("Password is required")).toBeInTheDocument();
        });
      });
      describe("And enter less than 8 characters", () => {
        it("Users sees 'Missing last name' error message", () => {
          renderWithRouter(<App />, { route: "/signup" });
          const password = screen.getByLabelText("Password");
          userEvent.type(password, "John");
          password.blur();
          expect(screen.getByText("Password is too short")).toBeInTheDocument();
        });
      });
    });

    describe("When user navigates to password confirmation field", () => {
      describe("And does not enter any characters", () => {
        it("Users sees message 'Password is required'", () => {
          renderWithRouter(<App />, { route: "/signup" });
          const confirmPassword = screen.getByLabelText(
            "Confirm your password"
          );
          confirmPassword.focus();
          confirmPassword.blur();
          expect(
            screen.getByText("Please confirm your password")
          ).toBeInTheDocument();
        });
      });
      describe("And enters not matching password", () => {
        it("Users sees 'Password does not match' error message", () => {
          renderWithRouter(<App />, { route: "/signup" });
          const password = screen.getByLabelText("Password");
          userEvent.type(password, "12345678");
          const confirmPassword = screen.getByLabelText(
            "Confirm your password"
          );
          userEvent.type(confirmPassword, "1234567");
          confirmPassword.blur();
          expect(
            screen.getByText("Password does not match")
          ).toBeInTheDocument();
        });
      });
    });

    describe("When user does not enter any data", () => {
      describe("And clicks continue button", () => {
        it("User should see error messages under each of the empty field", () => {
          renderWithRouter(<App />, { route: "/signup" });
          const continueBtn = screen.getByRole("button");
          userEvent.click(continueBtn);
          expect(screen.getByText("Email is required")).toBeInTheDocument();
          expect(screen.getByText("Full name is required")).toBeInTheDocument();
          expect(screen.getByText("Password is required")).toBeInTheDocument();
          expect(
            screen.getByText("Please confirm your password")
          ).toBeInTheDocument();
        });
      });
    });

    describe("When user enters all valid data", () => {
      it("User is redirected to protected page", async () => {
        renderWithRouter(<App />, { route: "/signup" });
        userEvent.type(
          screen.getByLabelText("Email address"),
          "test@example.com"
        );
        userEvent.type(screen.getByLabelText("Full Name"), "John Doe");
        userEvent.type(screen.getByLabelText("Password"), "abcdefgh");
        userEvent.type(
          screen.getByLabelText("Confirm your password"),
          "abcdefgh"
        );
        const continueBtn = screen.getByRole("button");
        userEvent.click(continueBtn);
        expect(
          await screen.findByText("User is on protected page")
        ).toBeInTheDocument();
      });
    });
  });
});
