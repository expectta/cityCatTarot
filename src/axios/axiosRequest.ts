import axios from "axios";
import { useHistory } from "react-router-dom";

const SERVER_URL = "http://3.36.182.36:8080";
//모든 카드 리스트
export function requestCardList() {
  // axios.defaults.headers.common["authorization"] = JSON.parse(
  //   localStorage.getItem("loginInfo")!
  // ).accessToken;
  const result = axios
    .get(`${SERVER_URL}/tarotChat`)
    .then((res) => {
      console.log(res, "악시오스 결과");
      if (res.status === 200) {
        return res.data;
      } else {
        alert("데이터가 없습니다");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
}

export function requestLogin(email: string, password: string) {
  // axios.defaults.headers.common["authorization"] = JSON.parse(
  //   localStorage.getItem("loginInfo")!
  // ).accessToken;
  const result = axios
    .post(`${SERVER_URL}/session`, { email: email, password: password })
    .then((res) => {
      console.log(res, "악시오스 결과");
      if (res.status === 201) {
        const accessToken = res.data.accessToken;
        alert("로그인 되었습니다.");
        localStorage.setItem(
          "loginInfo",
          JSON.stringify({
            userId: res.data.userId,
            isLogin: true,
            accessToken: accessToken,
          })
        );
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
}
export function requestSignUp(
  lastPassword: string,
  email: string,
  nickName: string
) {
  const result = axios
    .post(
      `${SERVER_URL}/register
		`,
      {
        email: email,
        nickName: nickName,
        password: lastPassword,
      }
    )
    .then((res) => {
      console.log(res, "악시오스 결과");
      if (res.status === 201) {
        return true;
      } else {
        alert("데이터가 없습니다");
      }
    })
    .catch((err) => {
      return false;
      console.log(err);
    });
  return result;
}
