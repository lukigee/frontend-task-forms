import React from "react";
import { Logo } from "./common";
import styled from "styled-components";
import { SignIn } from "./sign-in-page";
import { Switch, Route } from "react-router-dom";
import { SignUp } from "./sign-up-page";

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const App = () => {
  return (
    <AppContainer>
      <Logo />
      <Switch>
        <Route exact path="/">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/protected">
          <div>User is on protected page</div>
        </Route>
      </Switch>
    </AppContainer>
  );
};

export default App;
