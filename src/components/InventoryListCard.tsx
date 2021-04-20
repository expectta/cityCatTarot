import styled from "styled-components";
import { Link } from "react-router-dom";
import MyCard from "../pages/MyCard";
import react, { useState, useEffect } from "react";
interface props {
  image: string;
  title: string;
  userInputSubject: string;
  cardId: any;
  id: any;
  setMyTarotResult: any;
  cardDetail: any;
  hadleDeleteCard: any;
  setDeleteCard: any;
}
export default function InventoryListCard({
  image,
  title,
  userInputSubject,
  cardId,
  id,
  cardDetail,
  setMyTarotResult,
  hadleDeleteCard,
  setDeleteCard,
}: props) {
  console.log(image, "=이미지", title, " =제목");
  const [checkedCard, setCheckedCard] = useState({
    isChecked: false,
    inventoryId: 0,
    checkedCardInfo: {
      cardId: "",
      title: "",
      image: "",
      userInputSubject: "",
    },
  });
  const handleCheckedCard = (id) => {
    if (checkedCard.isChecked) {
      setCheckedCard({
        isChecked: false,
        inventoryId: 0,
        checkedCardInfo: {
          cardId: "",
          title: "",
          image: "",
          userInputSubject: "",
        },
      });
      return;
    }
    setCheckedCard({
      isChecked: !checkedCard.isChecked,
      inventoryId: id,
      checkedCardInfo: {
        cardId: cardId,
        title: title,
        image: image,
        userInputSubject: userInputSubject,
      },
    });
    setDeleteCard(id);
  };

  const handleCurrentCardId = (e, id) => {
    setMyTarotResult({
      cardId: cardId,
      title: title,
      image: image,
      cardDetail: cardDetail,
      userInputSubject: userInputSubject,
    });
    console.log(e.currentTarget.id, " 현재카드 ");
    console.log(id, " 현재 id ");
  };

  useEffect(() => {
    console.log(checkedCard, " 선택된 카드");
  }, [checkedCard]);
  return (
    <Container>
      <ListWrapper>
        <ImageWrapper>
          <CheckBoxWrapper>
            <CheckBox
              type="checkbox"
              checked={checkedCard.isChecked}
              onClick={() => handleCheckedCard(id)}
              readOnly
              // onChange={() => console.log()}
            ></CheckBox>
          </CheckBoxWrapper>
          <GoToDetail
            to={`/myCard`}
            onClick={(e) => {
              handleCurrentCardId(e, id);
            }}
          >
            <CardImage src={image}></CardImage>
          </GoToDetail>
        </ImageWrapper>

        {/* <CardTitle>{title}</CardTitle> */}
        <CardTitle> 제목 : {userInputSubject}</CardTitle>
        <CreatedAt></CreatedAt>
      </ListWrapper>
    </Container>
  );
}

const CheckBoxWrapper = styled.span`
  margin-right: 2%;
`;
const ImageWrapper = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
`;
const GoToDetail = styled(Link)``;
const CheckBox = styled.input`
  align-self: center;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
const ListWrapper = styled.div`
  margin: 2%;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid lightgray;
`;
const CardImage = styled.img`
  width: 100px;
  height: 150px;
`;
const CardTitle = styled.span`
  color: white;
  display: block;
  margin: 4%;
  margin-left: 10%;
`;
const CreatedAt = styled.span``;
