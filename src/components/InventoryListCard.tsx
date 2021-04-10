import styled from "styled-components";
interface props {
  image: string;
  title: string;
}
export default function InventoryListCard({ image, title }: props) {
  console.log(image, "=이미지", title, " =제목");
  return (
    <Container>
      <ListWrapper>
        <CardImage src={image}></CardImage>
        <CardTitle>{title}</CardTitle>
        <CreatedAt></CreatedAt>
      </ListWrapper>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const ListWrapper = styled.div``;
const CardImage = styled.img`
  width: 100px;
  height: 150px;
`;
const CardTitle = styled.span``;
const CreatedAt = styled.span``;
