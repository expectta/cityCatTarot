import React from "react";
import styled from "styled-components";
import react, { useState, useEffect } from "react";
import { InventoryListCard } from "../components/Index";
import { requestMyCardList } from "../axios/axiosRequest";
import { useHistory } from "react-router-dom";
import { requestMyCardDelete } from "../axios/axiosRequest";
interface props {
  loginInfo: any;
  setMyTarotResult: any;
}
export default function Inventory({ loginInfo, setMyTarotResult }: props) {
  const [cardList, setCardList] = useState<any[]>([]);
  const [deletCard, setDeleteCard] = useState(0);
  const history = useHistory();

  const handleInitialCardList = async () => {
    const result = await requestMyCardList(
      JSON.parse(localStorage.getItem("loginInfo")!).userId
    );
    console.log(result, " 카드리스트");
    if (result.length > 0) {
      console.log(result, " 결과값");
      setCardList(cardList.concat(...result));
      return;
    }
    setCardList([]);
  };
  const hadleDeleteCard = async () => {
    if (deletCard !== 0) {
      const result = await requestMyCardDelete(deletCard);
      console.log(result, " 삭제 결과값은/???");
      if (result) {
        handleInitialCardList();
      }
    } else {
      alert("카드를 선택해주세요");
    }
  };
  useEffect(() => {
    handleInitialCardList();
    return () => {};
  }, []);
  useEffect(() => {
    console.log(cardList, "업데이트 된  카드리스트");
  }, [cardList]);
  return (
    <>
      <Wrapper>
        <TitleWrapper>
          <Home
            onClick={() => {
              history.go(-1);
            }}
          >
            {"< Home으로"}
          </Home>
          <Container>My tarot result</Container>
          <Home></Home>
        </TitleWrapper>
        <CardListContainer>
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
        </CardListContainer>
      </Wrapper>
    </>
  );
}
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
  width: 200px;
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
  text-align: center;
  font-size: 3rem;
`;
