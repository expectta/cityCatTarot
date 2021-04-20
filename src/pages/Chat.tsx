import React, { useState, useEffect, useRef, useCallback } from "react";
import styled, { css } from "styled-components";
import { arr } from "../assets/Data";
import { PrintSpeach } from "../assets/PrintSpeach";
import ScrollToBottom, { useScrollToBottom } from "react-scroll-to-bottom";
import { useHistory, Link } from "react-router-dom";
// import Delayed from "react-delay-render";
import { Delayed } from "../components/Index";
import { requestCardList, requestPostCard } from "../axios/axiosRequest";
import { randomNumber } from "../utils/randomNumber";
import { currentTime } from "../utils/currentTime";
import { splitScript } from "../utils/splitScript";
import ScrollableFeed from "react-scrollable-feed";
import { IloginInfo } from "../App";
import { Igreeting } from "./Main";
interface props {
  openModal(message: string): void;
  loginInfo: IloginInfo;
  handleLogOut(): void;
  greetingList: any;
  greeting: Igreeting;
  closeModal(): void;
}
export default function Chat({
  openModal,
  loginInfo,
  greetingList,
  greeting,
  closeModal,
}: props) {
  const history = useHistory();
  const [mousePosition, setMousePosition] = useState({
    startposition: 0,
    xValue: 0,
    isMove: false,
  });
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
        content: greetingList,
        time: `${new Date()
          .getHours()
          .toString()} 시 ${new Date().getMinutes().toString()}분`,
        firstCategory: "응!",
      },
    ],
  });
  const [cardList, setCardList] = useState<any[]>([]);
  const [cardTitle, setCardTitle] = useState({
    message: "",
    visible: false,
    posted: false,
  });
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
  //cardList 요청
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
    // console.log(event, "=X , ", event);
    if (mousePosition.isMove) {
      setMousePosition({
        ...mousePosition,
        xValue: mousePosition.startposition - event.clientX,
      });
    }
  };
  useEffect(() => {
    if (mousePosition.isMove) {
      console.log(mousePosition.xValue / 2, "= 마우스 이동 계산값");
    }
  }, [mousePosition]);
  //마우스 다운 핸들러
  const handleMouseDown = (event) => {
    console.log(event.clientX, " = 마우스 다운위치");
    setMousePosition({
      ...mousePosition,
      startposition: event.clientX,
      isMove: true,
    });
  };
  const handleMouseUp = (event) => {
    console.log(event.clientX, " = 마우스 업 위치");
    setMousePosition({
      ...mousePosition,
      startposition: 0,
      isMove: false,
    });
  };

  useEffect(() => {
    console.log(cardTitle.message, "입력값이 변할떄");
    console.log(cardTitle.message.length, "입력값이 변할때 길이");
  }, [cardTitle]);
  //선택한 카드 보관함으로 저장
  const handlePostCard = () => {
    if (loginInfo.isLogin) {
      setCardTitle({ ...cardTitle, visible: true });
    } else {
      openModal("로그인 후 저장 가능합니다.");
    }
  };
  //user가 선택한 카드정보확인
  const handlePick = () => {
    const randomNum = randomNumber(greeting.checkedChat);
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
  //카드를 보관함에 저장
  const handleSaveCard = () => {
    console.log(cardTitle.message, " 카드 이름");
    console.log(cardTitle.message.length, " 카드 이름 길이");
    if (cardTitle.message.length === 0) {
      alert("제목을 입력하세요");
    }
    if (cardTitle.message.length > 0) {
      const result = requestPostCard(
        loginInfo.userId,
        chatData.currentCardInfo.cardId,
        chatData.currentCardInfo.cardCategory,
        chatData.currentCardInfo.cardImageUrl,
        chatData.currentCardInfo.cardTitle,
        chatData.currentCardInfo.cardDetail,
        cardTitle.message
      );
      if (result) {
        setCardTitle({ message: "", visible: false, posted: true });
      }

      alert("저장되었습니다");
      closeModal();
    }
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
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = useScrollToBottom();
  useEffect(() => {
    return () => {
      scrollToBottom();
    };
  });
  return (
    <Container>
      <TopWrapper>
        <GoBack onClick={() => history.replace("/")}>{"<"}</GoBack>
        <Mascot src="./botLogo.png"></Mascot>
        <Title>시티 캣</Title>
      </TopWrapper>
      <Body ref={messagesEndRef} cardList={chatData.currentStep !== 2}>
        <ScrollableFeed>
          <ChatList ref={messagesEndRef}>
            {chatData.script !== []
              ? chatData.script.map((element: any, mainIndex: number) => {
                  return element.content.map((el: any, index: any) => {
                    console.log(
                      Number(
                        `${mainIndex + 1}${
                          chatData.currentStep
                        }${index}${Math.floor(Math.random() * (10 - 0) + 0)}`
                      ),
                      "현재 스탭"
                    );
                    return (
                      <ListItem key={Number(`${mainIndex + 1}${index}`)}>
                        <Delayed
                          type={element.type}
                          avatar={index === 0 && element.avatar}
                          botName={index === 0 ? true : false}
                          timer={index * 1200}
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
                      </ListItem>
                    );
                  });
                })
              : null}
          </ChatList>
        </ScrollableFeed>
      </Body>
      <Footer cardList={chatData.currentStep === 2}>
        {chatData.currentStep === 2 ? (
          <CardContianer mouse={mousePosition.xValue}>
            {chatData.isExistCard.length > 1
              ? chatData.isExistCard.map((el: any, index: number) => {
                  return (
                    <CardWrapper
                      shift={index}
                      onClick={handlePick}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                    >
                      <Card></Card>
                    </CardWrapper>
                  );
                })
              : null}
          </CardContianer>
        ) : null}
      </Footer>
      {cardTitle.visible ? (
        <Modal>
          <ModalWrapper>
            <div>제목을 입력해주세요</div>
            <input
              onChange={(event) => {
                console.log(event.target.value, " 입력값");
                setCardTitle({ ...cardTitle, message: event?.target.value });
              }}
            ></input>
            <div>
              <PostButton onClick={() => handleSaveCard()}>저장</PostButton>
              <PostButton
                onClick={() =>
                  setCardTitle({ message: "", visible: false, posted: false })
                }
              >
                취소
              </PostButton>
            </div>
          </ModalWrapper>
        </Modal>
      ) : null}
    </Container>
  );
}
const ButtonWrapper = styled.div``;
const ModalWrapper = styled.div`
  width: 50%;
  height: 60%;
  text-align: center;
  padding: 5%;
  background: white;
  margin: 0 auto;
  border-radius: 10px;
`;

const CloseButton = styled.div`
  text-align: end;
  font-size: 1.5rem;
  cursor: pointer;
  margin-bottom: 16%;
`;
const Modal = styled.div`
  width: 500px;
  height: 200px;
  position: absolute;
  top: 30%;
`;
const CardPostWrapper = styled.div``;
const PostButton = styled.div`
  background: #6f6eff;
  width: 40%;
  font-size: 1rem;
  color: white;
  padding: 5px 20px 5px 20px;
  border: none;
  margin: 0 auto;
  margin-top: 5%;
  border-radius: 20px;
  display: inline-block;
  outline: 0px;
  cursor: pointer;
  text-decoration: none;
  margin-left: 1%;
  margin-right: 1%;
`;
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
      transform: rotate(${-props.mouse / 2}deg);
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
  // background: url("./chatBackground.jpeg") no-repeat;
	background-size: 100%;
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

const ChatList = styled(ScrollToBottom)`
  height: 89%;
  padding: 3%;
  list-style-type: none;
`;
