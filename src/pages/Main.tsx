import React from "react";
import styled, { keyframes } from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";
import { Slide } from "../components/Index";
export default function Main() {
  const urlMatch = useRouteMatch();
  return (
    <>
      <Container>
        <Wrapper>
          <SliderWrapper>{/* <Slide></Slide> */}</SliderWrapper>
          <SubTarotCard>
            <TodayTarot to="/chat"></TodayTarot>
            <SomeTarot to="/chat"></SomeTarot>
          </SubTarotCard>
        </Wrapper>
        <SideMenu>
          <SlideButton>{"보관함"}</SlideButton>
          <SlideContents></SlideContents>
        </SideMenu>
      </Container>
    </>
  );
}
const sideMenu = () => keyframes`
0%{
	margin-left: 663px;
	
}
100%{
	margin-left: 200px;
}
`;
const SlideButton = styled.span`
  width: 40px;
  height: 80px;
  margin-top: 40px;
  border-radius: 10px 0px 0px 10px;
  background: #9f9f9f8c;
`;
const SlideContents = styled.span`
  width: 95%;
  heigth: 100%;
  background: green;
`;
const SideMenu = styled.span`
  width: 600px;
  height: 100%;
  margin-left: 663px;
  display: flex;
  position: absolute;
  &:hover {
    animation: ${(props) => sideMenu()} 1s ease-in-out;
    margin-left: 200px;
  }
  animation-fill-mode: forwards;
`;
const Title = styled.div`
  background: red;
`;
const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: red;
  overflow: hidden;
  position: relative;
  display: flex;
`;
const Wrapper = styled.div`
  width: 95%;
  height: 95%;
  margin: 0 auto;
  align-self: center;

  background: blue;
`;
const TodayTarot = styled(Link)`
  height: 100%;
  background: green;
  ${({ theme }) => theme.common.defaultCardDiv}
`;
const SomeTarot = styled(Link)`
  height: 100%;
  background: orange;
  ${({ theme }) => theme.common.defaultCardDiv}
`;
const SubTarotCard = styled.div`
  height: 40%;
  width: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 3%;
  grid-template-row: repeat(1, 1fr);
`;
const SliderWrapper = styled.div`
  width: 100%;
  height: 57%;
`;
