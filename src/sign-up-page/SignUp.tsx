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

  const validateEmail = () => {
    const { email } = fields;
    let isValid;
    if (email.length === 0) {
      isValid = false;
      setError((prevErrors) => ({
        ...prevErrors,
        emailError: "Email is required",
      }));
    } else if (!emailChecker(email)) {
      isValid = false;
      setError((prevErrors) => ({
        ...prevErrors,
        emailError: "Invalid Email address",
      }));
    } else {
      isValid = true;
      setError((prevErrors) => ({ ...prevErrors, emailError: "" }));
    }
    return isValid;
  };

  const validateFullName = () => {
    const { fullname } = fields;
    let isValid;
    if (fullname.length === 0) {
      isValid = false;
      setError((prevErrors) => ({
        ...prevErrors,
        fullNameError: "Full name is required",
      }));
    } else if (fullname.split(" ").length === 1) {
      isValid = false;
      setError((prevErrors) => ({
        ...prevErrors,
        fullNameError: "Missing last name",
      }));
    } else {
      isValid = true;
      setError((prevErrors) => ({
        ...prevErrors,
        fullNameError: "",
      }));
    }
    return isValid;
  };

  const validatePassword = () => {
    const { password } = fields;
    let isValid;
    if (password.length === 0) {
      isValid = false;
      setError((prevErrors) => ({
        ...prevErrors,
        passwordError: "Password is required",
      }));
    } else if (password.length < 8) {
      isValid = false;
      setError((prevErrors) => ({
        ...prevErrors,
        passwordError: "Password is too short",
      }));
    } else {
      isValid = true;
      setError((prevErrors) => ({
        ...prevErrors,
        passwordError: "",
      }));
    }
    return isValid;
  };

  const validatePasswordConfirmation = () => {
    const { confirmPassword, password } = fields;
    let isValid;

    if (confirmPassword.length === 0) {
      isValid = false;
      setError((prevErrors) => ({
        ...prevErrors,
        confirmPasswordError: "Please confirm your password",
      }));
    } else if (confirmPassword !== password) {
      isValid = false;
      setError((prevErrors) => ({
        ...prevErrors,
        confirmPasswordError: "Password does not match",
      }));
    } else {
      isValid = true;
      setError({ ...error, confirmPasswordError: "" });
    }
    return isValid;
  };

  const formValidation = () => {
    return [
      validateEmail(),
      validatePassword(),
      validateFullName(),
      validatePasswordConfirmation(),
    ].every((fieldValidation) => fieldValidation);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const isValid = formValidation();
    if (isValid) {
      history.push("/protected");
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
