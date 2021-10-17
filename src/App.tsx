import React from "react";
import { Header, Logo } from "./common";
import styled from "styled-components";
import { SignIn } from "./sign-in-page";
import { Switch, Route, useLocation } from "react-router-dom";
import { SignUp } from "./sign-up-page";

const AppContainer = styled.div`
  box-sizing: border-box;
  width: 99vw;
  height: 98vh;
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 10%;
  padding-right: 10%;
`;

function App() {
  let location = useLocation();
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
      </Switch>
    </AppContainer>
  );
}

export default App;
