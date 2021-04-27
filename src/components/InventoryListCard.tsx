import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
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
  //보관함에 있는 카드 중 체크보스로 선택된 카드 정보
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
  //보관함 리스트 카드에 대한 체크박스 핸들러
  const handleCheckedCard = (id: number) => {
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
  //보관함에 있는 카드중 자세한 내용을 확인하기 위한 핸들러
  const handleCurrentCardId = () => {
    setMyTarotResult({
      cardId: cardId,
      title: title,
      image: image,
      cardDetail: cardDetail,
      userInputSubject: userInputSubject,
    });
  };
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
            ></CheckBox>
          </CheckBoxWrapper>
          <GoToDetail
            to={`/myCard`}
            onClick={(e) => {
              handleCurrentCardId();
            }}
          >
            <CardImage src={image}></CardImage>
          </GoToDetail>
        </ImageWrapper>
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
