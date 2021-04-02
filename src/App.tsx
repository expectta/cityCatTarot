import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import theme from "./assets/theme";
import { createMemoryHistory } from "history";
import { Main, Login, Inventory, UserInfo, Chat } from "./pages/Index";

export default function App() {
  const history = createMemoryHistory();
  return (
    <Router history={history}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" render={() => <Main></Main>}></Route>
          <Route exact path="/login" render={() => <Login></Login>}></Route>
          <Route
            exact
            path="/inventory"
            render={() => <Inventory></Inventory>}
          ></Route>
          <Route
            exact
            path="/userInfo"
            render={() => <UserInfo></UserInfo>}
          ></Route>
          <Route exact path="/chat" render={() => <Chat></Chat>}></Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

const GlobalStyle = createGlobalStyle`
* {
	box-sizing: border-box;
	scroll-behavior: smooth;
}
body{                        
	width:700px;
	height:100vh;
	margin : 0 auto;
	padding: 0;
}
`;
