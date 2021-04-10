import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
interface Props {
  wait?: boolean;
  timer: number;
  content: string;
  avatar: any;
  createdAt: any;
  botName: boolean;
  image: any;
  type: string;
  setChatData: any;
  handleVisiableButton: any;
  handleNextStep: any;
  category: any;
  handlePostCard: any;
}
const Delayed = ({
  image,
  timer,
  content,
  avatar,
  handlePostCard,
  createdAt,
  botName,
  type,
  category,
  handleNextStep,
  setChatData,
  handleVisiableButton,
}: Props) => {
  const [show, setShow] = useState(false);
  console.log("sadfasdfa");

  useEffect(() => {
    setInterval(() => {
      setShow(true);
    }, timer);
    return () => {
      if (createdAt && type === "bot") {
        console.log("마지막 컴포넌트");
        handleVisiableButton();
      }
    };
  }, [show]);

  if (!show) return null;
  console.log(category, " = 카테고리");
  return (
    <>
      {type === "user" ? (
        <>
          <Container type={type === "user"}>
            <CreatedAt isExist={createdAt}>{createdAt}</CreatedAt>
            <ListContent>{content}</ListContent>
          </Container>
        </>
      ) : (
        <>
          {botName && <BotName> 캣 봇</BotName>}
          <Container>
            <Avatar src={avatar}></Avatar>
            {image !== null ? (
              <ListContent>
                <Image src={image} />
                {content}
              </ListContent>
            ) : (
              <ListContent>{content}</ListContent>
            )}
            <CreatedAt isExist={createdAt}>{createdAt}</CreatedAt>
          </Container>
          {category === "응!" ? (
            <ButtonWrapper>
              <Button onClick={() => handleNextStep()}>{category}</Button>
            </ButtonWrapper>
          ) : null}
          {category === "보관함에 저장" ? (
            <ButtonWrapper>
              <Button onClick={() => handlePostCard()}>{category}</Button>
            </ButtonWrapper>
          ) : null}
        </>
      )}
    </>
  );
};
const ButtonWrapper = styled.div`
  width: 95;
  display: flex;
  margin: 0 auto;
  margin-top: 93px;
  justify-content: center;
`;
const Button = styled.div`
  width: 200px;
  text-align: center;
  cursor: pointer;
  background: white;
  margin: 0% 5% 0% 5%;
  font-size: 1.4rem;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 1.6%;
`;
export default Delayed;
const Image = styled.img`
  width: 200px;
  margin: 0 auto;
  padding: 3%;
  display: block;
`;
const BotName = styled.span`
  padding-left: 2%;
  font-size: 0.5rem;
`;
const Container = styled.div<any>`
  align-items: center;
  display: flex;

  ${(props) =>
    props.type &&
    css`
      place-content: flex-end;
      text-align: end;
    `}
`;
const Avatar = styled.img`
  align-self: start;
  width: 50px;
`;
const ListContent = styled.span`
  max-width: 60%;
  background: black;
  margin: 1.5%;
  font-size: 1.5rem;
  border-radius: 10px;
  padding: 2%;
  color: white;
  border: 1px solid #cf5fbf;
  box-shadow: 0px 0px 11px 2px #6727d7fc;
`;
const CreatedAt = styled.span<any>`
  font-size: 1rem;
  background: black;
  color: white;

  box-shadow: 0px 0px 11px 2px #6727d7fc;

  ${(props) =>
    props.isExist &&
    css`
      border: 1px solid #cf5fbf;
      border-radius: 10px;
      place-self: flex-end;
      margin: 0.5%;
      padding: 1%;
    `}
`;
