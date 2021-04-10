import React from "react";
import styled from "styled-components";
import react, { useState } from "react";
import { InventoryListCard } from "../components/Index";
export default function Inventory() {
  const [cardList, setCardList] = useState<any[]>([
    {
      cardId: 0,
      title: "바보",
      image: "./cardImage1.jpg",
    },
  ]);
  return (
    <>
      <Container>인벤토리</Container>
      <CardListWrapper>
        {cardList.map((el: any, index: number) => {
          console.log(el, "지금 콘텐츠");
          return (
            <InventoryListCard
              key={index}
              image={el.image}
              title={el.title}
            ></InventoryListCard>
          );
        })}
      </CardListWrapper>
    </>
  );
}

const CardListWrapper = styled.ul``;
const Container = styled.div`
  width: 95%;
  margin: 0 auto;
  background: red;
  text-align: center;
`;
