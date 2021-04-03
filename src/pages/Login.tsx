import React, { useState } from "react";
import styled from "styled-components";

export default function Main() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  return (
    <Wrapper>
      <Container>
        <LoginFormStyle>
          <Logo src="./botLogo.png"></Logo>
          <Title>로그인</Title>
          <div>
            <InputWrap>
              <InputStyle
                type="text"
                name="email"
                value={email}
                placeholder="email 을 입력하세요"
                onChange={handleEmail}
                required
              />
              <InputStyle
                type="password"
                name="password"
                value={password}
                placeholder="비밀번호를 입력하세요"
                onChange={handlePassword}
                required
              />
            </InputWrap>
            {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : ""}

            <ButtonWrap>
              <Button type="button">로그인</Button>

              {/* <KakaoLogin
                token={process.env.REACT_APP_KAKAO_JSAVASCRIPT_KEY}
                onSuccess={console.log}
                onFail={console.error}
                onLogout={console.info}
              /> */}
            </ButtonWrap>
          </div>
        </LoginFormStyle>
      </Container>
    </Wrapper>
  );
}
const Logo = styled.img`
  margin-bottom: 20%;
  width: 100%;
`;
const Container = styled.div`
  background: black;
  width: 60%;
  height: 100%;
  display: flex;
  margin: 0 auto;
`;
const Wrapper = styled.div`
  background: black;
  width: 100%;
  height: 100vh;
`;
const Title = styled.div`
  color: white;
  font-size: 2rem;
  text-align: center;
`;
const InputWrap = styled.div``;
const InputStyle = styled.input`
  ${({ theme }) => theme.common.defaultInput}
`;
const LoginFormStyle = styled.div`
  width: 80%;
  margin: 0 auto;
  place-self: center;
`;

const ButtonWrap = styled.div`
  text-align: center;
`;

const Button = styled.button`
  ${({ theme }) => theme.common.defaultButton}
`;

const ErrorMessage = styled.div`
  color: #ea4435;
  font-size: 0.8rem;
`;
