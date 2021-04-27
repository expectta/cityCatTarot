import React from "react";
import styled from "styled-components";
import react, { useState, useEffect } from "react";
import { InventoryListCard } from "../components/Index";
import { requestMyCardList } from "../axios/axiosRequest";
import { useHistory } from "react-router-dom";
import { requestMyCardDelete } from "../axios/axiosRequest";
import { IloginInfo } from "../App";
interface Iprops {
  setMyTarotResult(ImyTarotResult): void;
}
export default function Inventory({ setMyTarotResult }: Iprops) {
  const history = useHistory();
  //보관함 카드 리스트
  const [cardList, setCardList] = useState<any[]>([]);
  // 현재 선택된 카드
  const [deletCard, setDeleteCard] = useState<number>(0);
  //로그인한 유저의 카드 보관함리스트 요청
  const handleInitialCardList = async () => {
    const result = await requestMyCardList(
      JSON.parse(localStorage.getItem("loginInfo")!).userId
    );
    if (result.length > 0) {
      setCardList(cardList.concat(...result));
      return;
    }
    setCardList([]);
  };
  //보관함 카드 삭제 핸들러
  const hadleDeleteCard = async () => {
    if (deletCard !== 0) {
      const result = await requestMyCardDelete(deletCard);
      if (result) {
        handleInitialCardList();
      }
    } else {
      alert("카드를 선택해주세요");
    }
  };
  //보관함 페이지 접속시 최초 유저의 보관함 cardlist목록 요청
  useEffect(() => {
    handleInitialCardList();
    return () => {};
  }, []);
  return (
    <>
      <Wrapper>
        <TitleWrapper>
          <Home
            onClick={() => {
              history.go(-1);
            }}
          >
            {"< Home"}
          </Home>
          <Container>My tarot result</Container>
          <Home></Home>
        </TitleWrapper>
        <CardListContainer>
          {cardList.length === 0 ? (
            <Nocard>보관함에 저장되어 있는 카드가 없습니다</Nocard>
          ) : (
            <>
              <DeleteButton onClick={() => hadleDeleteCard()}>
                {"체크항목 삭제"}
              </DeleteButton>
              <CardListWrapper>
                {cardList.map((el: any, index: number) => {
                  console.log(el.inventoryId, "지금 콘텐츠");
                  return (
                    <InventoryListCard
                      key={index}
                      id={el.inventoryId}
                      cardId={el.cardId}
                      image={el.cardImageUrl}
                      title={el.title}
                      cardDetail={el.cardDetail}
                      userInputSubject={el.userInputSubject}
                      setMyTarotResult={setMyTarotResult}
                      hadleDeleteCard={hadleDeleteCard}
                      setDeleteCard={setDeleteCard}
                    ></InventoryListCard>
                  );
                })}
              </CardListWrapper>
            </>
          )}
        </CardListContainer>
      </Wrapper>
    </>
  );
}
const Nocard = styled.div`
  color: white;
  width: 100%;
  margin-top: 10%;
  text-align: center;
`;
const DeleteButton = styled.div`
  text-align: end;
  cursor: pointer;
  color: white;
`;
const CardListContainer = styled.div`
  height: 94%;
  overflow: auto;
  padding: 2%;
`;
const TitleWrapper = styled.div`
  display: flex;
  height: 6%;
`;
const Home = styled.span`
  margin: 0 auto;
  background: #d751ef;
  text-align: start;
  font-size: 1.5rem;
  padding: 2%;
  flex: 1 auto;
  cursor: pointer;
  padding-left: 5%;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 99vh;
`;
const CardListWrapper = styled.ul`
  overfolw: hidden;
  padding: 0;
`;
const Container = styled.span`
  margin: 0 auto;
  background: #d751ef;
  font-size: 3rem;
  flex: 2 auto;
`;
