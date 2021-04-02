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
}
const Delayed = ({
  image,
  timer,
  content,
  avatar,
  createdAt,
  botName,
  type,
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
        </>
      )}
    </>
  );
};

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
  border: 1px solid lightgray;
  max-width: 60%;
  background: white;
  margin: 0.5%;
  font-size: 1.5rem;
  border-radius: 10px;
  padding: 2%;
`;
const CreatedAt = styled.span<any>`
  font-size: 1rem;
  background: white;
  ${(props) =>
    props.isExist &&
    css`
      border: 1px solid lightgray;
      border-radius: 10px;
      place-self: flex-end;
      margin: 0.5%;
      padding: 1%;
    `}
`;
