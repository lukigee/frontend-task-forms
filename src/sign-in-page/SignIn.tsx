import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Header, StyledButton } from "../common";
import { emailChecker } from "../utils";

const FormContainer = styled.div`
  width: 40em;
  box-sizing: border-box;
  margin-top: 4em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormWrapper = styled.form`
  width: 25em;
  border: 2px solid black;
  box-shadow: 0.2em 0.2em 0.2em black;
  padding: 2.5rem 2.5rem;
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
`;

const LabelWrapper = styled.label`
  width: 100%;
  height: 5em;
  font-weight: bold;
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.input`
  width: 100%;
  height: 3em;
  border: 1px solid black;
  box-sizing: border-box;
  margin: 0.5em auto;

  :hover {
    outline-width: 1px;
    outline-style: dashed;
  }
`;

export const SignIn = () => {
  const [error, setError] = useState({
    emailError: false,
    passwordError: false,
  });
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    !error.emailError && alert(JSON.stringify(fields));
  };

  const handleOnBlur = () => {
    if (!emailChecker(fields.email)) {
      setError({ ...error, emailError: true });
    } else {
      setError({ ...error, emailError: false });
    }
  };
  const handleOnChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    if (target.name === "email") {
      setFields({ ...fields, email: target.value });
    } else {
      setFields({ ...fields, password: target.value });
    }
  };

  return (
    <FormContainer>
      <Header>Sign In</Header>
      <FormWrapper onSubmit={handleSubmit}>
        <LabelWrapper>
          Email address
          <InputWrapper
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            value={fields.email}
            placeholder="me@example.com"
            name="email"
          />
        </LabelWrapper>
        {error.emailError && (
          <p style={{ color: "red", fontSize: "1.25em", marginTop: "-0.25em" }}>
            "Invalid Email address"
          </p>
        )}
        <LabelWrapper>
          Password
          <InputWrapper
            name="password"
            onChange={handleOnChange}
            value={fields.password}
          />
        </LabelWrapper>
        <StyledButton type="submit">Continue</StyledButton>
      </FormWrapper>
      <div>
        <label>Not our member yet? </label>
        <Link to="/signup">Click here to create new Account</Link>
      </div>
    </FormContainer>
  );
};
