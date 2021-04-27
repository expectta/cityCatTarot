import styled, { keyframes } from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { BsJustify } from "react-icons/bs";
import { IloginInfo } from "../App";

interface Iprops {
  loginInfo: IloginInfo;
  openModal(message: string): void;
  handleLogOut(): void;
  setGreeting(Igreeting): void;
  greeting: Igreeting;
}
export interface Igreeting {
  checkedChat: number;
  greetingScript: string[][];
}
export default function Main({
  loginInfo,
  handleLogOut,
  setGreeting,
  greeting,
}: Iprops) {
  const history = useHistory();
  //type 별 카드 종류 업데이트
  const handleChangeChatType = (number: number): void => {
    setGreeting({ ...greeting, checkedChat: number });
  };
  const handleLogout = () => {
    localStorage.clear();
    handleLogOut();
    history.replace("/");
  };
  return (
    <>
      <Container>
        <Wrapper>
          <SliderWrapper>
            <Video src="./mainBener.mp4" muted autoPlay loop></Video>
          </SliderWrapper>
          <SubTarotCard>
            <TodayTarot to="/tarotChat" onClick={() => handleChangeChatType(0)}>
              <TodayImg src="./today.jpg"></TodayImg>
            </TodayTarot>
            <SomeTarot to="/tarotChat" onClick={() => handleChangeChatType(1)}>
              <SomeImg src="./some.jpg"></SomeImg>
            </SomeTarot>
          </SubTarotCard>
        </Wrapper>
        <SideMenu>
          <SlideButton>
            <Icon size={36}></Icon>
          </SlideButton>
          <SlideContents>
            <Logo src="./botLogo.png"></Logo>
            <Nav>
              {loginInfo.isLogin ? (
                <MenuContainer>
                  <Logout onClick={handleLogout}>로그아웃</Logout>
                  <UserInfo to="/userInfo">회원정보</UserInfo>
                </MenuContainer>
              ) : (
                <Login to="/login">로그인</Login>
              )}
            </Nav>
            <MenuWrapper>
              {loginInfo.isLogin ? (
                <Menu to="/invetory">
                  <InventoryImgae src="./inventoryImage.jpeg"></InventoryImgae>
                </Menu>
              ) : (
                <div onClick={() => alert("로그인이 필요합니다.")}>
                  <InventoryImgae src="./inventoryImage.jpeg"></InventoryImgae>
                </div>
              )}
            </MenuWrapper>
          </SlideContents>
        </SideMenu>
      </Container>
    </>
  );
}
const MenuContainer = styled.div`
  padding-bottom: 3%;
  border-bottom: 1px solid lightgray;
`;
const UserInfo = styled(Link)`
  color: white;
  text-decoration: none;
  margin-top: 4%;
`;
const InventoryImgae = styled.img`
  width: 150px;
  margin: 0 auto;
  margin-top: 5%;
  display: block;
`;
const Logout = styled.div`
  color: white;
  text-align: end;
  margin-bottom: 3%;
  cursor: pointer;
`;
const Video = styled.video`
  width: 100%;
`;
const SomeImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 15px 15px 15px 15px;
`;
const TodayImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 15px 15px 15px 15px;
`;
const Logo = styled.img`
  width: 20%;
  margin: 0 auto;
  margin-top: 10%;
`;
const Icon = styled(BsJustify)`
  place-self: center;
`;
const sideMenu = () => keyframes`
0%{
	margin-left: 361px;
	
}
100%{
	margin-left: 150px;
}
`;
const Login = styled(Link)`
  color: white;
  width: 100%;
  display: block;
  text-align: end;
  cursor: pointer;
  padding-bottom: 3%;
  border-bottom: 1px solid lightgray;
`;
const Nav = styled.div`
  text-align-last: start;
  width: 100%;
  font-size: 1.4rem;
  padding: 2%;
  padding-left: 10%;
  margin-top: 10%;
  margin-bottom: 15%;
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
  text-align: center;
  heigth: 100%;
  background: black;
`;
const SideMenu = styled.span`
  width: 70%;
  height: 100%;
  margin-left: 461px;
  display: flex;
  position: absolute;

  &:hover {
    animation: ${(props) => sideMenu()} 1s ease-in-out;
    margin-left: 150px;
  }
  animation-fill-mode: forwards;
`;
const Container = styled.div`
  width: 100%;
  height: 99vh;
  background: url(./back.jpg);
  overflow: hidden;
  position: relative;
  display: flex;
  box-shadow: 0px 0px 11px 2px #6727d7fc;
`;
const Wrapper = styled.div`
  width: 95%;
  height: 95%;
  margin: 0 auto;
  align-self: center;
`;
const TodayTarot = styled(Link)`
  ${({ theme }) => theme.common.defaultCardDiv}
  height: 300px;
`;
const SomeTarot = styled(Link)`
  ${({ theme }) => theme.common.defaultCardDiv}
  height: 300px;
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
  height: 53%;
  overflow: hidden;
  margin-top: 3%;
  padding-bottom: 5%;
`;
const Menu = styled(Link)`
  color: white;
  text-decoration: none;
`;
const MenuWrapper = styled.div`
  margin-top: 5%;
  width: 100%;
`;
