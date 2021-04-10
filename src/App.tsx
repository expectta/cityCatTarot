import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import theme from "./assets/theme";
import { createMemoryHistory } from "history";
import { Main, Login, Inventory, UserInfo, Chat, SignUp } from "./pages/Index";
import { Modal } from "./components/Index";
export default function App() {
  const history = createMemoryHistory();
  const [loginInfo, setLoginInfo] = useState({
    userId: 0,
    isLogin: false,
  });
  // modal 상태
  const [modalMessage, setModalMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  // loading 상태
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // modal창 제거
  const closeModal = (login: string) => {
    if (login) {
      history.push("/login");
      setModalVisible(false);
    }
    setModalVisible(false);
  };
  //modal창 활성화
  const openModal = (message: string) => {
    setModalMessage(message);
    setModalVisible(true);
  };
  //로그아웃
  const handleLogOut = () => {
    setLoginInfo({
      userId: 0,
      isLogin: false,
    });
    alert("로그아웃 되었습니다");
  };
  //로그인
  const handleLogin = () => {
    setLoginInfo({
      userId: JSON.parse(localStorage.getItem("loginInfo")!).userId,
      isLogin: true,
    });
  };
  useEffect(() => {
    if (localStorage.getItem("loginInfo")) {
      setLoginInfo({
        userId: JSON.parse(localStorage.getItem("loginInfo")!).userId,
        isLogin: true,
      });
    }
  }, []);
  return (
    <Router>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Main
                loginInfo={loginInfo}
                openModal={openModal}
                handleLogOut={handleLogOut}
              />
            )}
          ></Route>
          <Route
            exact
            path="/login"
            render={() => <Login handleLogin={handleLogin}></Login>}
          />
          <Route exact path="/signUp" render={() => <SignUp></SignUp>}></Route>
          <Route
            exact
            path="/invetory"
            render={() => <Inventory></Inventory>}
          ></Route>
          <Route
            exact
            path="/userInfo"
            render={() => <UserInfo></UserInfo>}
          ></Route>
          <Route exact path="/chat" component={Chat}>
            <Chat
              openModal={openModal}
              loginInfo={loginInfo}
              handleLogOut={handleLogOut}
            ></Chat>
          </Route>
        </Switch>
      </ThemeProvider>
      <Modal visible={modalVisible} closable maskClosable onClose={closeModal}>
        <h3>{modalMessage}</h3>
        {loginInfo.isLogin ? (
          <></>
        ) : (
          <GoLogin to="/login" onClick={() => closeModal("login")}>
            로그인
          </GoLogin>
        )}
      </Modal>
    </Router>
  );
}

const GoLogin = styled(Link)`
  background: #6f6eff;
  width: 50%;
  display: inline-block;
  margin-bottom: 1%;
  font-size: 1rem;
  color: white;
  padding: 5px 20px 5px 20px;
  border: none;
  border-radius: 20px;
  outline: 0px;
  cursor: pointer;
  text-decoration: none;
`;
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
	background:black;

}
`;
