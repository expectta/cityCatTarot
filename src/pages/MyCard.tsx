import react from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
interface props {
  myTarotResult: any;
}
export default function MyCard({ myTarotResult }: props) {
  const history = useHistory();
  return (
    <Container>
      <Wrapper>
        <MenuWrapper>
          <Previous onClick={() => history.go(-1)}>{"<뒤로가기"}</Previous>
        </MenuWrapper>
        <ContainerTitle>Tarot result</ContainerTitle>
        <CardImage src={myTarotResult.image}></CardImage>
        <CardTitle>{myTarotResult.title}</CardTitle>
        <CardDescription>{myTarotResult.cardDetail}</CardDescription>
      </Wrapper>
    </Container>
  );
}
const Previous = styled.span`
  text-align: start;
  font-size: 1.5rem;
  color: white;
  flex: 1 auto;
  cursor: pointer;
`;
const Logout = styled.span`
  color: white;
  cursor: pointer;
`;
const MenuWrapper = styled.div`
  display: flex;
  padding: 5px 20px 5px 20px;
`;
const CardDescription = styled.div`
  width: 95%;
  height: 30%;
  color: white;
  border: 1px solid white;
  border-radius: 20px;
  padding: 4%;
  margin: 0 auto;
  font-size: 1.4rem;
  overflow: auto;
`;
const CardTitle = styled.div`
  color: white;
  font-size: 1.4rem;
  padding: 2%;
`;
const CardImage = styled.img`
  width: 200px;
`;
const Wrapper = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
`;
const Container = styled.div`
  width: 100%;
  height: 97vh;
  text-align: center;
`;
const ContainerTitle = styled.h3`
  color: white;
  font-size: 2rem;
`;
