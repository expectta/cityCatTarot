import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  Route,
  Switch,
  Link,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import { Slide } from "../components/Index";
import { BsJustify } from "react-icons/bs";
import Inventory from "./Inventory";
interface props {
  loginInfo: any;
  openModal: any;
  handleLogOut: any;
}
export default function Main({ loginInfo, openModal, handleLogOut }: props) {
  const history = useHistory();
  const urlMatch = useRouteMatch();
  const [menu, setMenu] = useState({
    name: "",
  });

  const handleChangeMenu = (menuName: string) => {
    setMenu({
      name: menuName,
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    handleLogOut();
    history.replace("/");
  };
  return (
    <>
      {/* <Slide></Slide> */}
      <Container>
        <Wrapper>
          <SliderWrapper>
            <Video src="./mainBener.mp4" muted autoPlay loop></Video>
          </SliderWrapper>
          <SubTarotCard>
            <TodayTarot to="/chat">
              <TodayImg src="./today.jpg"></TodayImg>
            </TodayTarot>
            <SomeTarot to="/chat">
              <SomeImg src="./some.jpg"></SomeImg>
            </SomeTarot>
          </SubTarotCard>
        </Wrapper>
        <SideMenu>
          <SlideButton>
            <Icon size={36}></Icon>
          </SlideButton>
          <SlideContents>
            <Nav>
              {loginInfo.isLogin ? (
                <Logout onClick={handleLogout}>logout</Logout>
              ) : (
                <Login to="/login">login</Login>
              )}
            </Nav>
            <Logo src="./botLogo.png"></Logo>
            <MenuWrapper>
              <Menu to="/invetory">내 보관함</Menu>
            </MenuWrapper>
          </SlideContents>
        </SideMenu>
      </Container>
    </>
  );
}
const Logout = styled.div`
  cursor: pointer;
`;
const Video = styled.video``;
const SomeImg = styled.img`
  width: 100%;
  border-radius: 15px 15px 15px 15px;
`;
const TodayImg = styled.img`
  width: 100%;
  border-radius: 15px 15px 15px 15px;
`;
const Logo = styled.img`
  width: 30%;
  margin: 0 auto;
`;
const Icon = styled(BsJustify)`
  place-self: center;
`;
const sideMenu = () => keyframes`
0%{
	margin-left: 660px;
	
}
100%{
	margin-left: 100px;
}
`;
const Login = styled(Link)``;
const Nav = styled.div`
  text-align-last: start;
  width: 100%;
  font-size: 1.4rem;
  padding: 2%;
`;
const SlideButton = styled.span`
  width: 40px;
  height: 80px;
  margin-top: 80px;
  display: flex;
  border-radius: 10px 0px 0px 10px;
  background: #9f9f9f8c;
`;
const SlideContents = styled.span`
  width: 95%;
  text-align: center;
  heigth: 100%;
  background: green;
`;
const SideMenu = styled.span`
  width: 660px;
  height: 100%;
  margin-left: 660px;
  display: flex;
  position: absolute;
  &:hover {
    animation: ${(props) => sideMenu()} 1s ease-in-out;
    margin-left: 100px;
  }
  animation-fill-mode: forwards;
`;
const Title = styled.div`
  background: red;
`;
const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: url(./back.jpg);
  // overflow: hidden;
  position: relative;
  display: flex;
`;
const Wrapper = styled.div`
  width: 95%;
  height: 95%;
  margin: 0 auto;
  align-self: center;
`;
const TodayTarot = styled(Link)`
  height: 100%;
  ${({ theme }) => theme.common.defaultCardDiv}
`;
const SomeTarot = styled(Link)`
  height: 100%;
  ${({ theme }) => theme.common.defaultCardDiv}
`;
const SubTarotCard = styled.div`
  height: 40%;
  width: auto;
  display: grid;
  padding-top: 4%;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 3%;
  grid-template-row: repeat(1, 1fr);
`;
const SliderWrapper = styled.div`
  width: 100%;
  height: 54%;
  overflow: hidden;

  padding-bottom: 5%;
`;
const Menu = styled(Link)`
  background: white;
`;
const MenuWrapper = styled.div`
  width: 100%;
  background: green;
`;
