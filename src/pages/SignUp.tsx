import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { strongPassword, isEmail } from "../utils/validation";
import { requestSignUp } from "../axios/axiosRequest";

export default function SignUp() {
  const history = useHistory();
  const PREVIOUS_PAGE = -1;
  // input 값 상태
  const [email, setEmail] = useState("");
  const [isUsableEmail, setIsUsableEmail] = useState(false);
  const [nickName, setNickName] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [lastPassword, setLastPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  // modal 상태
  const [modalMessage, setModalMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  // 유효성 검사
  const [validation, setValidation] = useState({
    validEmail: false,
    validPassword: false,
    validMobile: false,
  });
  const closeModal = () => {
    setModalVisible(false);
  };
  // modal창 오픈 시
  // const openModal = buttonName => {
  //   if (buttonName === "overlapping-button") {
  //     setModalMessage("사용할 수 있는 email입니다.");
  // 	}
  //   setModalVisible(true);
  // };

  const handleNickName = (event) => {
    setNickName(event.target.value);
  };

  const closeForm = () => {
    setEmail("");
    setNickName("");
    setMessage("");
  };

  // 비밀번호 일치여부 판단
  //! 비밀번호 , 비밀번호 확인 input 태그에 똑같은 조건이 모두 있어야 함.
  const handleFirstPassword = (event) => {
    const { value } = event.target;
    setFirstPassword(value);
    setValidation({
      ...validation,
      validPassword: strongPassword(value),
    });

    if (lastPassword.length > 0) {
      if (value !== lastPassword) {
        setMessage("비밀번호 불일치");
        setIsValidPassword(false);
      } else if (lastPassword === "") {
        setMessage("");
      } else if (value === lastPassword) {
        setMessage("비밀번호 일치");
        setIsValidPassword(true);
      }
    }
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
    setValidation({
      ...validation,
      validEmail: isEmail(event.target.value),
    });
  };
  const handleLastPassword = (event) => {
    const { value } = event.target;
    setLastPassword(value);
    if (value !== firstPassword) {
      setMessage("비밀번호 불일치");
      setIsValidPassword(false);
    } else if (firstPassword === " ") {
      setMessage("");
    } else if (value === firstPassword) {
      setMessage("비밀번호 일치");
      setIsValidPassword(true);
    }
  };
  // email 중복여부 체크
  const handleRequestCheckEmail = () => {
    const { validEmail } = validation;

    if (!validEmail) {
      setModalMessage("Email 형식을 확인 해 주세요");
      setModalVisible(true);
      return;
    }
    if (email !== "") {
      try {
      } catch (err) {
        console.log(err);
      }
      return;
    }
    setModalMessage("email을 입력해주세요.");
    setModalVisible(true);
  };
  // 회원등록 요청
  const handleRequestSignUp = () => {
    console.log("회원 버튼 입력");
    // const { validEmail, validPassword, validMobile } = validation;
    // if (!isUsableEmail) {
    //   setModalMessage("email 중복을 확인 해주세요.");
    //   setModalVisible(true);
    //   return;
    // }
    // if (!validEmail) {
    //   setModalMessage("Email 형식을 확인 해주세요");
    //   setModalVisible(true);
    //   return;
    // }
    // if (!validPassword) {
    //   setModalMessage("비밀번호 규칙을 확인 해 주세요");
    //   setModalVisible(true);
    //   return;
    // }
    // if (!validMobile) {
    //   setModalMessage("핸드폰 번호 형식을 확인 해 주세요");
    //   setModalVisible(true);
    //   return;
    // }
    console.log(
      lastPassword,
      "비번",
      isUsableEmail,
      "eamil",
      nickName,
      "닉네임"
    );
    // if (lastPassword && isUsableEmail && nickName) {
    try {
      const result = requestSignUp(lastPassword, email, nickName);
      if (result) {
        history.push("/");
      }
    } catch (err) {
      setModalMessage("이미 동일한 email이 존재합니다");
      setModalVisible(true);
    }
    // } else {
    //   setModalMessage("모든 입력사항은 필수 입니다.");
    //   setModalVisible(true);
    // }
  };
  return (
    <Wrapper>
      <Container>
        <Logo src="./botLogo.png"></Logo>
        <Title>Sign Up</Title>
        <SignUpFormStyle>
          <p id="notification">모든항목은 필수입력 사항입니다.</p>
          <UserInfoTable id="signup-form-table">
            <TableRow>
              <TableData className="label">email</TableData>
              <TableData className="input-tag">
                <input
                  type="text"
                  name="email"
                  onChange={handleEmail}
                  placeholder="email은 로그인시 id로 사용됩니다"
                  required
                />
                {validation.validEmail ? (
                  <ValidCheck>{/* <FcCheckmark size="22" /> */}</ValidCheck>
                ) : (
                  <>
                    {email.length > 1 ? (
                      <CheckPasswordMessage>
                        Email형식이 아닙니다
                      </CheckPasswordMessage>
                    ) : null}
                  </>
                )}
              </TableData>
              <TableData></TableData>
              <TableData className="overlapping-cbutton">
                <Button
                  id="overlapping-button"
                  onClick={handleRequestCheckEmail}
                >
                  중복확인{" "}
                </Button>
              </TableData>
            </TableRow>
            <TableRow>
              <TableData className="label">비밀번호</TableData>
              <TableData className="input-tag">
                <div>
                  <input
                    type="password"
                    name="firstPassword"
                    placeholder="8자 이상(문자,숫자,특수기호(@$!%*#?)중 하나)"
                    value={firstPassword}
                    onChange={handleFirstPassword}
                    required
                  />
                </div>
                {validation.validPassword ? (
                  <ValidCheck>{/* <FcCheckmark size="22" /> */}</ValidCheck>
                ) : (
                  <>
                    {firstPassword.length > 1 ? (
                      <CheckPasswordMessage>
                        비밀번호 규칙을 확인해주세요
                      </CheckPasswordMessage>
                    ) : null}
                  </>
                )}
              </TableData>
              <TableData></TableData>
            </TableRow>
            <TableRow>
              <TableData className="label">비밀번호 확인</TableData>
              <TableData className="input-tag">
                <input
                  type="password"
                  name="lastPassword"
                  placeholder="비밀번호를 입력하세요"
                  value={lastPassword}
                  onChange={handleLastPassword}
                  required
                />
                <TableData className="button-wrap">
                  <Error check={isValidPassword}>{message}</Error>
                </TableData>
              </TableData>
            </TableRow>
            <TableRow>
              <TableData className="label">닉네임</TableData>
              <TableData className="input-tag">
                <input
                  type="text"
                  name="password"
                  onChange={handleNickName}
                  required
                />
              </TableData>
            </TableRow>
            <TableRow></TableRow>
          </UserInfoTable>
          <ButtonWrap>
            <Button
              id="signUp-button"
              type="button"
              onClick={handleRequestSignUp}
            >
              가입하기
            </Button>
            <Button type="button" onClick={() => history.go(PREVIOUS_PAGE)}>
              취소
            </Button>
          </ButtonWrap>
        </SignUpFormStyle>
      </Container>

      {/* <NorificationModal
			visible={modalVisible}
			closeable
			maskClosable
			onClose={closeModal}
		>
			<h3>{modalMessage}</h3>
		</NorificationModal> */}
    </Wrapper>
  );
}
const ToSiginUp = styled(Link)`
  display: block;
  color: red;
`;
const Logo = styled.img`
  margin-bottom: 20%;
  width: 50%;
  margin: 0 auto;
  margin-bottom: 10%;
`;
const Container = styled.div`
  place-self: center;
`;
const Wrapper = styled.div`
  background: black;
  width: 100%;
  height: 100vh;
  display: flex;
  text-align: center;
`;
const Title = styled.div`
  color: white;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 3%;
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

const Button = styled.button`
  margin: 0% 2% 0% 2%;
  ${({ theme }) => theme.common.defaultButton}
`;

const ErrorMessage = styled.div`
  color: #ea4435;
  font-size: 0.8rem;
`;
// SignUpForm 영역
const SignUpFormStyle = styled.div`
  width: 80%;
  padding: 1.5rem;
  background: white;
  border-radius: 5px;
  margin: 0 auto;
  text-align: center;

  p {
    font-size: 1.125rem;
    padding-right: 20px;
  }
  input {
    display: block;
    width: 100%;
    height: 40px;
    border: 1px solid lightgray;
    border-radius: 3px;
  }
  div.email-wrap {
    display: flex;
  }
  b {
    font-size: 1rem;
    line-height: 53px;
    width: 200px;
    text-align: left;
  }
  input#sign-up {
    border-radius: 4px;
    font-weight: bold;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 30px;
    display: inline;
    width: 200px;
    height: 40px;
    background: blueviolet;
    color: white;
  }
  table {
    width: 100%;
  }
  #notification {
    font-size: 0.8rem;
    /* text-align: left; */
    /* justify-content: left; */
    text-align: right;
  }
  #signup-form-table {
    display: initail;
  }
  .overlapping-cbutton {
    width: 100px;
  }
`;
const Error = styled.span<any>`
  font-size: 0.7rem;
  float: left;
  margin-left: 7px;
  color: ${(props) => (props.check ? "green" : "red")};
`;
const TableRow = styled.tr`
  margin-top: 7px;
`;
const TableData = styled.td``;
const UserInfoTable = styled.table`
  .label {
    text-align: left;
    width: 100px;
  }
  input {
    padding-left: 10px;
  }
`;
const ButtonWrap = styled.div`
  margin-top: 33px;
  display: flex;
`;
const Exit = styled.div`
  text-align: right;
`;
const ValidCheck = styled.div`
  text-align: left;
`;
const CheckPasswordMessage = styled.span`
  font-size: 0.7rem;
  color: red;
`;
