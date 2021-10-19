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
    return Object.entries(fields).every((item) => item[1] === "");
  };

  const noErrors = (): boolean => {
    return Object.entries(error).every((item) => item[1] === "");
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

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    const target = e.target;
    const { email, password, fullname, confirmPassword } = fields;

    switch (target.name) {
      case "email":
        email.length === 0
          ? setError({ ...error, emailError: "Email is required" })
          : !emailChecker(email)
          ? setError({ ...error, emailError: "Invalid Email address" })
          : setError({ ...error, emailError: "" });
        break;
      case "fullname":
        fullname.length === 0
          ? setError({ ...error, fullNameError: "Full name is required" })
          : fullname.split(" ").length > 1
          ? setError({ ...error, fullNameError: "" })
          : setError({ ...error, fullNameError: "Missing last name" });
        break;
      case "password":
        password.length === 0
          ? setError({ ...error, passwordError: "Password is required" })
          : password.length >= 8
          ? setError({ ...error, passwordError: "" })
          : setError({ ...error, passwordError: "Password is too short" });
        break;
      case "confirmPassword":
        confirmPassword.length === 0
          ? setError({
              ...error,
              confirmPasswordError: "Please confirm your password",
            })
          : confirmPassword === password
          ? setError({ ...error, confirmPasswordError: "" })
          : setError({
              ...error,
              confirmPasswordError: "Password does not match",
            });
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
