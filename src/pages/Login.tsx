import { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { requestLogin } from "../axios/axiosRequest";
interface props {
  handleLogin(): void;
}
export default function SignUp({ handleLogin }: props) {
  const history = useHistory();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  //사용자 입력값 업데이트
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  //로그인 핸들러
  const handleClickLogin = async () => {
    if (email && password) {
      const result = await requestLogin(email, password);
      handleLogin();
      if (result) {
        history.goBack();
      } else {
        alert("회원정보를 확인 해 주세요");
      }
    } else {
      alert("회원정보를 입력해주세요");
    }
  };
  return (
    <Wrapper>
      <Container>
        <LoginFormStyle>
          <Logo src="./botLogo.png"></Logo>
          <Title>Sign In</Title>
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
              <Background>
                <Left></Left>
                <Right></Right>
              </Background>
              <Button type="button" onClick={handleClickLogin}>
                로그인
              </Button>
              <Background>
                <Left></Left>
                <Right></Right>
              </Background>
              <Button type="button" onClick={() => history.goBack()}>
                취소
              </Button>
            </ButtonWrap>
          </div>
          <ToSiginUp to="/signUp">회원가입</ToSiginUp>
        </LoginFormStyle>
      </Container>
    </Wrapper>
  );
}
const Background = styled.div`
  width: 100%;
  height: 37px;
  display: flex;
  position: relative;
  top: 41px;
`;
const Left = styled.span`
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 11px 4px #6727d7fc;
  background: blue;
`;
const Right = styled.span`
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 11px 4px #e338c2c9;
  background: violet;
`;
const ToSiginUp = styled(Link)`
  display: block;
  margin-top: 6%;
  text-align: end;
  font-size: 1.3rem;
  color: white;
`;
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
  margin-bottom: 5%;
`;
const InputWrap = styled.div``;
const InputStyle = styled.input`
  position: relative;

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
  background: black;
  position: relative;
  border: 1px solid #3fe327;

  ${({ theme }) => theme.common.defaultButton};
`;

const ErrorMessage = styled.div`
  color: #ea4435;
  font-size: 0.8rem;
`;
