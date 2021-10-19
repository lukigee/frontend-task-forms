import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { PrimaryButton, TextField, GuestLayout, FormLayout } from "../common";
import { emailChecker } from "../utils";
interface FormError {
  emailError: string;
  passwordError: string;
}

export const SignIn = () => {
  let history = useHistory();
  const [error, setError] = useState<FormError>({
    emailError: "",
    passwordError: "",
  });
  const [fields, setFields] = useState({
    email: "",
    password: "",
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
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    const target = e.target;
    const { email } = fields;
    switch (target.name) {
      case "email":
        !emailChecker(email)
          ? setError({ ...error, emailError: "Invalid Email address" })
          : setError({ ...error, emailError: "" });
        break;
    }
  };
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target;
    if (target.name === "email") {
      setFields({ ...fields, email: target.value });
    } else {
      setFields({ ...fields, password: target.value });
    }
  };

  return (
    <GuestLayout title="Sign In">
      <FormLayout
        onSubmit={handleSubmit}
        additonalInfo={
          <>
            Not our member yet?
            <br />
            <Link to="/signup">Click here to create new Account</Link>
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
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
          value={fields.password}
        />
        <PrimaryButton type="submit">Continue</PrimaryButton>
      </FormLayout>
    </GuestLayout>
  );
};
