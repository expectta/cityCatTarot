import React, { useState, useEffect, useRef, useCallback } from "react";
import styled, { css } from "styled-components";
import { arr } from "../assets/Data";
import { PrintSpeach } from "../assets/PrintSpeach";
import ScrollToBottom, { useScrollToBottom } from "react-scroll-to-bottom";
import { useHistory, Link } from "react-router-dom";
// import Delayed from "react-delay-render";
import { Delayed } from "../components/Index";
import { requestCardList } from "../axios/axiosRequest";
import { randomNumber } from "../utils/randomNumber";
import { currentTime } from "../utils/currentTime";
import { splitScript } from "../utils/splitScript";
interface props {
  openModal: any;
  loginInfo: any;
  handleLogOut: any;
}
export default function Chat({ openModal, loginInfo, handleLogOut }: props) {
  const history = useHistory();
  const [mousePosition, setMousePosition] = useState({
    x: 0,
  });
  const scrollToBottom = useScrollToBottom();
  const [chatData, setChatData] = useState({
    botName: "캣봇",
    currentStep: 0,
    currentCardInfo: {
      cardId: 0,
      cardCategory: "",
      userIndputSubject: "",
      cardImageUrl: "",
      cardTitle: "",
      cardDetail: "",
    },
    isVisibleButton: false,
    isExistCard: new Array(77).fill(0),
    script: [
      {
        step: 0,
        type: "bot",
        avatar: "./botLogo.png",
        image: "./hello.jpg",
        cardId: 0,
        content: [
          "안녕~",
          "나는 타로를 봐주는 냥냥이야.",
          "오늘의 운세를 봐 줄까냥?",
        ],
        time: `${new Date()
          .getHours()
          .toString()} 시 ${new Date().getMinutes().toString()}분`,
        firstCategory: "응!",
      },
    ],
  });
  const [cardList, setCardList] = useState<any[]>([]);
  const handleNextStep = () => {
    const time = currentTime();
    const choiceScript = [
      {
        step: 1,
        type: "user",
        avatar: "",
        image: "",
        cardId: 0,
        content: ["응"],
        time: time,
        firstCategory: "",
        secondCategory: "",
      },
      {
        step: 2,
        type: "bot",
        avatar: "./botLogo.png",
        cardId: 0,
        image: "./pick1.jpeg",
        content: ["카드를 골라보라냥"],
        time: time,
        firstCategory: "",
        secondCategory: "",
      },
    ];
    setChatData({
      ...chatData,
      isVisibleButton: false,
      currentStep: chatData.currentStep + 1,
      script: [...chatData.script, ...choiceScript],
    });
  };
  const handleCancle = () => {
    history.push("/");
  };
  const handleVisiableButton = () => {
    setChatData({
      ...chatData,
      isVisibleButton: true,
    });
  };
  const handleCardRequest = async () => {
    const result = await requestCardList();
    setCardList(cardList.concat(result));
    setChatData({
      ...chatData,
      currentStep: chatData.currentStep + 1,
    });
    if (chatData.currentStep) console.log(result, "요청결과");
  };
  const handleMouseMove = (event) => {
    if (event.type === "mousedown") {
      console.log(event.clientX, "=X , ", event);
      setMousePosition({
        x: event.clientX,
      });
      console.log("마우스다운");
    }
  };
  //선택한 카드 보관함으로 저장
  const handlePostCard = () => {
    if (loginInfo.isLogin) {
      return openModal("카드저장완료");
    }
    return openModal("로그인 후 저장 가능합니다.");
  };
  const handlePick = () => {
    const randomNum = randomNumber();
    const time = currentTime();
    const script = splitScript(cardList[randomNum].cardDetail) as string[];
    const pickedCard = {
      step: 3,
      type: "bot",
      avatar: "./botLogo.png",
      image: cardList[randomNum].cardImageUrl,
      cardId: cardList[randomNum].cardId,
      cardTitle: cardList[randomNum].cardTitle,
      content: script,
      time: time,
      firstCategory: "보관함에 저장",
      secondCategory: "홈으로",
    };
    console.log(chatData.currentStep + 1, "현재 스탭");
    setChatData({
      ...chatData,
      isVisibleButton: false,
      currentStep: chatData.currentStep + 1,
      currentCardInfo: {
        cardId: cardList[randomNum].cardId,
        cardCategory: cardList[randomNum].cardCategory,
        userIndputSubject: "",
        cardImageUrl: cardList[randomNum].cardImageUrl,
        cardTitle: cardList[randomNum].cardTitle,
        cardDetail: cardList[randomNum].cardDetail,
      },

      script: [...chatData.script, pickedCard],
    });
  };
  useEffect(() => {
    console.log(chatData.currentStep, "현재 스탭");
    if (chatData.currentStep === 1) {
      handleCardRequest();
    }
    return () => {
      console.log("타이밍 보기");
    };
  }, [chatData.currentStep]);
  return (
    <Container>
      <TopWrapper>
        <GoBack onClick={() => history.replace("/")}>{"<"}</GoBack>
        <Mascot src="./botLogo.png"></Mascot>
        <Title>캣 봇</Title>
      </TopWrapper>
      <Body cardList={chatData.currentStep !== 2}>
        <ChatList>
          {chatData.script !== []
            ? chatData.script.map((element: any, mainIndex: number) => {
                return element.content.map((el: any, index: any) => {
                  console.log(
                    element.content.length,
                    "엘리먼트 길이",
                    index,
                    " = index",
                    chatData.script.length - 1,
                    " = 대사전체 길이",
                    chatData.script[chatData.currentStep].step,
                    "= 현재스탭"
                  );
                  return (
                    <ListItem key={index}>
                      <Delayed
                        type={element.type}
                        avatar={index === 0 && element.avatar}
                        botName={index === 0 && true}
                        timer={index * 1000}
                        image={
                          element.image && index === 0 ? element.image : null
                        }
                        content={el}
                        createdAt={
                          index === element.content.length - 1 && element.time
                        }
                        setChatData={setChatData}
                        handleVisiableButton={handleVisiableButton}
                        category={
                          chatData.script.length - 1 === mainIndex &&
                          element.content.length - 1 === index
                            ? chatData.script[chatData.currentStep]
                                .firstCategory
                            : null
                        }
                        handlePostCard={handlePostCard}
                        handleNextStep={handleNextStep}
                      ></Delayed>
                      {/* {element.content.length - 1 === index ? (
                        <ButtonWrapper>
                          <Button onClick={() => handleNextStep()}>
                            {
                              chatData.script[chatData.currentStep]
                                .firstCategory
                            }
                          </Button>
                        </ButtonWrapper>
                      ) : null} */}
                    </ListItem>
                  );
                });
              })
            : null}
        </ChatList>
      </Body>
      <Footer cardList={chatData.currentStep === 2}>
        {/* {chatData.script[chatData.currentStep].firstCategory ? (
          <ButtonWrapper>
            <Button onClick={() => handleNextStep()}>
              {chatData.script[chatData.currentStep].firstCategory}
            </Button>
          </ButtonWrapper>
        ) : null} */}
        {chatData.currentStep === 2 ? (
          <CardContianer mouse={mousePosition.x}>
            {chatData.isExistCard.length > 1
              ? chatData.isExistCard.map((el: any, index: number) => {
                  return (
                    <CardWrapper
                      shift={index}
                      onClick={handlePick}
                      onMouseDown={handleMouseMove}
                      onMouseMove={handleMouseMove}
                    >
                      <Card></Card>
                    </CardWrapper>
                  );
                })
              : null}
          </CardContianer>
        ) : null}
      </Footer>
    </Container>
  );
}
const CardContianer = styled.div<any>`
  display: flex;
  place-content: center;
  position: relative;
  top: 16px;
  z-index: 100;
  height: 1200px;
  ${(props) =>
    props.mouse &&
    css`
      transform: rotate(${-(props.mouse / 8)}deg);
    `}
  transition: all ease 1s;
`;
const CardWrapper = styled.div<any>`
  float: left;
  display: flex;
  height: 600px;
  position: absolute;
  transform-origin: left bottom;
  ${(props) =>
    props.shift &&
    css`
      transform: rotate(${props.shift * 10}deg);
      z-index: ${props.shift};
    `}
  &:hover {
    z-index: 1000;
  }
`;
const Card = styled.span<any>`
  width: 130px;
  height: 200px;
  border: 1px solid lightgray;
  border-radius: 10px;
  background: url(./cardImage2.jpg);
  background-size: 100% 100%;
  position: absolute;
`;

const Container = styled.div`
  width: 100%;
  height: 95%;
  margin: 0 auto;
  border: 1px solid white;
`;
const TopWrapper = styled.div`
  height: 10vh;
  display: flex;
  align-items: center;
  margin: 0 auto;
  background: white;
  * {
    margin: 0% 2% 0% 2%;
  }
`;
const Body = styled.div<any>`
  width: 95%;
  height: 70vh;
  overflow: auto;
	overflow-y: overlay;
	margin: 0 auto;
  background: black;
  // background: url("./chatBackground.jpeg") no-repeat;
	background-size: 100% 100%;
	${(props) =>
    props.cardList &&
    css`
      height: 90vh;
    `}}
`;
const Footer = styled.div<any>`
  width: 95%;
  margin: 0 auto;
  background: black;
  overflow: hidden;
  z-index: 1000;
  ${(props) =>
    props.cardList &&
    css`
      height: 20vh;
    `}
`;
const Title = styled.span`
  font-size: 2rem;
`;
const GoBack = styled.span`
  font-size: 2rem;
  cursor: pointer;
`;
const Mascot = styled.img`
  width: 70px;
`;
const ListItem = styled.li`
  font-size: 2rem;
`;

const BotImage = styled.img``;
const ChatList = styled(ScrollToBottom)`
  height: 100%;
  padding: 3%;
  list-style-type: none;
`;
