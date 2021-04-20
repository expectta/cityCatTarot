import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { IloginInfo } from "../App";
import { requestUserInfo, requestModifyUserInfo } from "../axios/axiosRequest";
import { strongPassword } from "../utils/validation";
interface props {
  loginInfo: IloginInfo;
}
export default function Main({ loginInfo }: props) {
  const history = useHistory();
  const [firstPassword, setFirstPassword] = useState("");
  const [lastPassword, setLastPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  // 유효성 검사
  const [validation, setValidation] = useState({
    validEmail: false,
    validPassword: false,
    validMobile: false,
  });
  const [userInfo, setUserInfo] = useState({
    isModify: false,
    userId: 0,
    userEmail: "",
    nickName: "",
    passwordModify: "",
    nickNameModify: "",
  });
  const [inputValue, setInpuValue] = useState({
    password: "",
    checkPasswrod: "",
    isPassword: false,
    nickName: "",
    isNickName: false,
    message: "",
    messageVisible: false,
    passwrodValidation: false,
  });
  const hadleGetUserInfo = async () => {
    console.log(loginInfo.userId, " 현재 유저아이디");
    const result = await requestUserInfo(
      JSON.parse(localStorage.getItem("loginInfo")!).userId
    );
    console.log(
      JSON.parse(localStorage.getItem("loginInfo")!).userId,
      " 로컬데이터!!!!!!!!!!!!!!!!!!!!!!!",
      result.id,
      " =====결과 id"
    );
    if (result.id === JSON.parse(localStorage.getItem("loginInfo")!).userId) {
      console.log(result, " 회원정보 수정 후 업데이트");
      setUserInfo({
        ...userInfo,
        userId: result.userId,
        userEmail: result.email,
        nickName: result.nickName,
      });
    }
  };
  const haldeRequestModifyUserInfo = async (newData) => {
    if (Object.keys(newData).includes("password") && !isValidPassword) {
      alert("비밀번호를 확인 해 주세요");
      return;
    }
    if (Object.keys(newData).includes("nickName") && !inputValue.nickName) {
      alert("닉네임을 확인해주세요");
      return;
    }
    const result = await requestModifyUserInfo(newData, loginInfo.userId);
    if (result) {
      setInpuValue({
        password: "",
        checkPasswrod: "",
        isPassword: false,
        nickName: "",
        isNickName: false,
        message: "",
        messageVisible: false,
        passwrodValidation: false,
      });
      hadleGetUserInfo();
    }
    setMessage("");
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
  const handleCheckPassword = (event) => {
    const { value } = event.target;
    if (strongPassword(value)) {
      setInpuValue({
        ...inputValue,
        message: "",
        messageVisible: false,
      });
      return;
    }
    setInpuValue({
      ...inputValue,
      message: "비밀번호 형식에 맞지 않습니다",
      messageVisible: true,
    });
  };
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

  const hadleFixUserInfo = () => {};
  const handleChangeUserinfo = () => {
    setUserInfo({
      ...userInfo,
      isModify: !userInfo.isModify,
    });
  };
  useEffect(() => {
    hadleGetUserInfo();
  }, []);
  useEffect(() => {
    console.log(inputValue.nickName, " 닉네임");
    console.log(lastPassword, "두번째 비번");
    console.log(validation, "유효성검사");
  }, [firstPassword, lastPassword, validation.validPassword, inputValue]);
  return (
    <>
      <Container>
        <InnerContianer>
          <Home
            onClick={() => {
              history.go(-1);
            }}
          >
            {"< Home으로"}
          </Home>
          <Title>회원정보</Title>
          <UserInfoTable>
            <tr>
              <TableData>
                <UserInfoLabel>email </UserInfoLabel>
              </TableData>
              <TableData>
                <UserInfoLabel>{userInfo.userEmail}</UserInfoLabel>
              </TableData>
            </tr>
            <tr>
              <TableData>
                <UserInfoLabel>password </UserInfoLabel>
              </TableData>
              <TableData>
                {inputValue.isPassword ? (
                  <InputTagWrapper>
                    <InputTag
                      type="password"
                      name="firstPassword"
                      placeholder="8자 이상(문자,숫자,특수기호(@$!%*#?)중 하나)"
                      value={firstPassword}
                      onChange={handleFirstPassword}
                      required
                    ></InputTag>
                    <InputTag
                      type="password"
                      name="lastPassword"
                      placeholder="비밀번호를 입력하세요"
                      value={lastPassword}
                      onChange={handleLastPassword}
                      required
                    ></InputTag>
                  </InputTagWrapper>
                ) : (
                  <UserInfoLabel>{"*******"}</UserInfoLabel>
                )}
              </TableData>
              <TableData>
                {inputValue.isPassword ? (
                  <>
                    <TableInnerButton
                      onClick={() =>
                        haldeRequestModifyUserInfo({ password: lastPassword })
                      }
                    >
                      저장
                    </TableInnerButton>
                    <TableInnerButton
                      onClick={() =>
                        setInpuValue({
                          ...inputValue,
                          isPassword: !inputValue.isPassword,
                        })
                      }
                    >
                      취소
                    </TableInnerButton>
                  </>
                ) : (
                  <TableInnerButton
                    onClick={() =>
                      setInpuValue({
                        ...inputValue,
                        isPassword: !inputValue.isPassword,
                      })
                    }
                  >
                    비밀번호 변경
                  </TableInnerButton>
                )}
              </TableData>
            </tr>
            <tr>
              <TableData>
                <UserInfoLabel>nickName </UserInfoLabel>
              </TableData>
              <TableData>
                {inputValue.isNickName ? (
                  <InputTag
                    onChange={(e) =>
                      setInpuValue({
                        ...inputValue,
                        nickName: e.target.value,
                      })
                    }
                  ></InputTag>
                ) : (
                  <UserInfoLabel> {userInfo.nickName}</UserInfoLabel>
                )}
              </TableData>
              <TableData>
                {inputValue.isNickName ? (
                  <>
                    <TableInnerButton
                      onClick={() =>
                        haldeRequestModifyUserInfo({
                          nickName: inputValue.nickName,
                        })
                      }
                    >
                      저장
                    </TableInnerButton>
                    <TableInnerButton
                      onClick={() =>
                        setInpuValue({
                          ...inputValue,
                          isNickName: !inputValue.isNickName,
                        })
                      }
                    >
                      취소
                    </TableInnerButton>
                  </>
                ) : (
                  <TableInnerButton
                    onClick={() =>
                      setInpuValue({
                        ...inputValue,
                        isNickName: !inputValue.isNickName,
                      })
                    }
                  >
                    닉네임 변경
                  </TableInnerButton>
                )}
              </TableData>
            </tr>
          </UserInfoTable>
          {validation.validPassword ? null : (
            <>
              {firstPassword.length > 1 ? (
                <ErrorMessage>비밀번호 규칙을 확인해주세요</ErrorMessage>
              ) : null}
            </>
          )}
          <ErrorMessage check={isValidPassword}>{message}</ErrorMessage>
        </InnerContianer>
      </Container>
    </>
  );
}
const Home = styled.div`
  width: 100%;
  text-align: start;
  font-size: 1.5rem;
  padding: 2%;
  flex: 1 auto;
  color: white;
  cursor: pointer;
  padding-left: 5%;
  margin-bottom: 15%;
`;
const ErrorMessage = styled.div<any>`
  color: white;
  color: ${(props) => (props.check ? "green" : "red")};
`;
const InputTagWrapper = styled.div`
  text-align: center;
`;
const InputTag = styled.input`
  display: block;
  width: 100%;
  font-size: 1rem;
`;
const TableData = styled.td`
  width: fit-content;
  padding-top: 3%;
`;

const TableInnerButton = styled.span`
  background: white;
  border-radius: 10px;
  cursor: pointer;
  margin-left: 1%;
  margin-right: 1%;
  margin: 1%;
  padding: 3%;
`;
const Button = styled.span`
  text-align: center;
  cursor: pointer;
  background: white;
  margin: 1% 5% 1% 5%;
  font-size: 1.4rem;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 1.2%;
`;
const ButtonWrapper = styled.div`
  margin-top: 10%;
  text-align: center;
`;
const Title = styled.div`
  color: white;
  margin-bottom: 5%;
  font-size: 1.5rem;
`;
const InnerContianer = styled.div`
  margin: 0 auto;
  text-align: -webkit-center;
`;
const Container = styled.div`
  width: 95%;
  height: 100vh;
  margin: 0 auto;
`;
const TableTitle = styled.th`
  color: white;
`;
const UserInfoTable = styled.table`
  width: 100%;
  text-align: center;
  border: 1px solid lightgrey;
  padding: 4%;
  border-radius: 20px;
`;
const UserInfoLabel = styled.label`
  color: white;
`;
