import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import theme from "./assets/theme";
import { createMemoryHistory } from "history";
import {
  Main,
  Login,
  Inventory,
  UserInfo,
  Chat,
  SignUp,
  MyCard,
} from "./pages/Index";
import { Modal } from "./components/Index";
interface Igreeting {
  checkedChat: number;
  greetingScript: string[][];
}
export interface IloginInfo {
  userId: number;
  isLogin: boolean;
}
export interface ImyTarotResult {
  cardId: string;
  title: string;
  image: string;
  cardDetail: string;
  userInputSubject: string;
}
export default function App() {
  const history = createMemoryHistory();
  //login 유저 정보
  const [loginInfo, setLoginInfo] = useState<IloginInfo>({
    userId: 0,
    isLogin: false,
  });
  //유저가 선택한 카드 정보
  const [myTarotResult, setMyTarotResult] = useState<ImyTarotResult>({
    cardId: "",
    title: "",
    image: "",
    cardDetail: "",
    userInputSubject: "",
  });
  //채팅창 실행시 봇 인삿말
  const [greeting, setGreeting] = useState<Igreeting>({
    checkedChat: 0,
    greetingScript: [
      ["안녕~", "나는 타로를 봐주는 냥냥이야.", "오늘의 운세를 봐 줄까냥?"],
      [
        "안냥? 썸 타는 사람 생겼냥? 부럽다냥.... ",
        "혹시 썸 타는 사람도 없는데 이 타로 보는건 아니겠지?",
        "진짜 썸타는 사람 생겼을 때만 보라냥! 그럼 상대방은 어떤 마음일지,",
        "잘 될 수 있을지 한 번 타로카드를 뽑아보라냥!",
      ],
    ],
  });
  // modal 상태
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  // loading 상태
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // modal창 제거
  const closeModal = (login?: string) => {
    if (login) {
      history.push("/login");
      setModalVisible(false);
    }
    setModalVisible(false);
  };
  //modal창 활성화
  const openModal = (message: string): void => {
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
  const handleLogin = (): void => {
    if (localStorage.getItem("loginInfo")) {
      setLoginInfo({
        userId: JSON.parse(localStorage.getItem("loginInfo")!).userId,
        isLogin: true,
      });
    }
  };
  //main화면 로그인시 유저 정보가 localstorage에 저장되어 있으면
  //로그인상태로 전환
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
                setGreeting={setGreeting}
                greeting={greeting}
              />
            )}
          ></Route>
          <Route
            exact
            path="/login"
            render={() => <Login handleLogin={handleLogin}></Login>}
          />
          <Route
            exact
            path="/signUp"
            render={() => (
              <SignUp
                setModalVisible={setModalVisible}
                setModalMessage={setModalMessage}
                modalMessage={modalMessage}
              ></SignUp>
            )}
          ></Route>
          <Route
            exact
            path="/invetory"
            render={() => (
              <Inventory setMyTarotResult={setMyTarotResult}></Inventory>
            )}
          ></Route>
          <Route
            exact
            path="/userInfo"
            render={() => <UserInfo loginInfo={loginInfo}></UserInfo>}
          ></Route>
          <Route exact path="/tarotChat" component={Chat}>
            <Chat
              greetingList={greeting.greetingScript[greeting.checkedChat]}
              greeting={greeting}
              openModal={openModal}
              loginInfo={loginInfo}
              handleLogOut={handleLogOut}
              closeModal={closeModal}
            ></Chat>
          </Route>
          <Route exact path="/myCard" component={MyCard}>
            <MyCard myTarotResult={myTarotResult}></MyCard>
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
	a{ text-decoration: none;
		
	}
}
body{                        
	width:500px;
	height:100vh;
	margin : 0 auto;
	padding: 0;
	background:black;
	border: 1px solid #cf5fbf;
  box-shadow: 0px 0px 11px 2px #6727d7fc
}
`;
