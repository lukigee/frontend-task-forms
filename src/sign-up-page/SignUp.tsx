import { FormLayout, GuestLayout, PrimaryButton, TextField } from "../common";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { emailChecker } from "../utils";
interface FormError {
  emailError: string;
  passwordError: string;
  fullNameError: string;
  confirmPasswordError: string;
}

export const SignUp = () => {
  let history = useHistory();
  const [error, setError] = useState<FormError>({
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    fullNameError: "",
  });
  const [fields, setFields] = useState({
    email: "",
    fullname: "",
    password: "",
    confirmPassword: "",
  });

  const everyFieldsEmpty = (): boolean => {
    return Object.values(fields).every((value) => value === "");
  };

  const noErrors = (): boolean => {
    return Object.values(error).every((value) => value === "");
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const hasEmptyFields = everyFieldsEmpty();
    noErrors() && !hasEmptyFields && history.push("/protected");
    if (hasEmptyFields) {
      setError({
        emailError: "Email is required",
        passwordError: "Password is required",
        confirmPasswordError: "Please confirm your password",
        fullNameError: "Full name is required",
      });
    }
  };

  const validateEmail = () => {
    const { email } = fields;
    if (email.length === 0) {
      setError({ ...error, emailError: "Email is required" });
    } else if (!emailChecker(email)) {
      setError({ ...error, emailError: "Invalid Email address" });
    } else {
      setError({ ...error, emailError: "" });
    }
  };

  const validateFullName = () => {
    const { fullname } = fields;
    if (fullname.length === 0) {
      setError({ ...error, fullNameError: "Full name is required" });
    } else if (fullname.split(" ").length === 1) {
      setError({ ...error, fullNameError: "Missing last name" });
    } else {
      setError({ ...error, fullNameError: "" });
    }
  };

  const validatePassword = () => {
    const { password } = fields;
    if (password.length === 0) {
      setError({ ...error, passwordError: "Password is required" });
    } else if (password.length < 8) {
      setError({ ...error, passwordError: "Password is too short" });
    } else {
      setError({ ...error, passwordError: "" });
    }
  };

  const validatePasswordConfirmation = () => {
    const { confirmPassword, password } = fields;
    if (confirmPassword.length === 0) {
      setError({
        ...error,
        confirmPasswordError: "Please confirm your password",
      });
    } else if (confirmPassword !== password) {
      setError({
        ...error,
        confirmPasswordError: "Password does not match",
      });
    } else {
      setError({ ...error, confirmPasswordError: "" });
    }
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    const target = e.target;

    switch (target.name) {
      case "email":
        validateEmail();
        break;
      case "fullname":
        validateFullName();
        break;
      case "password":
        validatePassword();
        break;
      case "confirmPassword":
        validatePasswordConfirmation();
        break;
    }
  };
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target;

    switch (target.name) {
      case "email":
        setFields({ ...fields, email: target.value });
        break;
      case "fullname":
        setFields({ ...fields, fullname: target.value });
        break;
      case "password":
        setFields({ ...fields, password: target.value });
        break;
      case "confirmPassword":
        setFields({ ...fields, confirmPassword: target.value });
        break;
    }
  };

  return (
    <GuestLayout title="Sign Up">
      <FormLayout
        onSubmit={handleSubmit}
        additonalInfo={
          <>
            Already using our app?
            <br />
            <Link to="/">Click here to sign in</Link>
          </>
        }
      >
        <TextField
          label="Email address"
          onChange={handleChange}
          onBlur={handleBlur}
          value={fields.email}
          placeholder="me@example.com"
          name="email"
          type="email"
          error={error.emailError}
        />
        <TextField
          label="Full Name"
          name="fullname"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="John Doe"
          value={fields.fullname}
          error={error.fullNameError}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={fields.password}
          error={error.passwordError}
        />
        <TextField
          label="Confirm your password"
          type="password"
          name="confirmPassword"
          onBlur={handleBlur}
          onChange={handleChange}
          value={fields.confirmPassword}
          error={error.confirmPasswordError}
        />
        <PrimaryButton type="submit">Continue</PrimaryButton>
      </FormLayout>
    </GuestLayout>
  );
};
