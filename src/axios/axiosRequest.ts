import axios from "axios";
import { useHistory } from "react-router-dom";
import { strongPassword } from "../utils/validation";

// axios.defaults.withCredentials = true;
const SERVER_URL = "http://3.36.182.36:8080";
//모든 카드 리스트
export function requestCardList() {
  // axios.defaults.headers.common["authorization"] = JSON.parse(
  //   localStorage.getItem("loginInfo")!
  // ).accessToken;
  const result = axios
    .get(`${SERVER_URL}/tarotChat`)
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data, " 리스트 결과값");
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

export function requestPostCard(
  userId,
  cardId,
  cardCategory,
  cardImageUrl,
  cardTitle,
  cardDetail,
  userIndputSubject
) {
  // axios.defaults.withCredentials = true;
  const token = JSON.parse(localStorage.getItem("loginInfo")!).accessToken;
  // axios.defaults.withCredentials = true;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const result = axios
    .post(
      `${SERVER_URL}/inventory/post-card
		`,
      {
        userId: userId,
        cardId: cardId,
        cardCategory: cardCategory,
        cardImageUrl: cardImageUrl,
        cardTitle: cardTitle,
        cardDetail: cardDetail,
        userInputSubject: userIndputSubject,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

export function requestMyCardList(userId) {
  // axios.defaults.withCredentials = true;
  const token = JSON.parse(localStorage.getItem("loginInfo")!).accessToken;
  // axios.defaults.withCredentials = true;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const result = axios
    .get(`${SERVER_URL}/inventory/get-card/${userId}`)
    .then((res) => {
      console.log(res, "보관함 카드 리스트");
      if (res.status === 200) {
        return res.data;
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

export function requestMyCardDelete(inventoryId) {
  // axios.defaults.withCredentials = true;
  const token = JSON.parse(localStorage.getItem("loginInfo")!).accessToken;
  // axios.defaults.withCredentials = true;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const result = axios
    .delete(`${SERVER_URL}/inventory/delete-card/${inventoryId}`)
    .then((res) => {
      console.log(res, " 카드 삭제요청 결과");
      if (res.status === 200) {
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

export function requestUserInfo(userId) {
  // axios.defaults.withCredentials = true;
  const token = JSON.parse(localStorage.getItem("loginInfo")!).accessToken;
  // axios.defaults.withCredentials = true;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const result = axios
    .get(`${SERVER_URL}/users/${userId}`)
    .then((res) => {
      console.log(res.data, " 카드 삭제요청 결과");
      if (res.status === 200) {
        return res.data;
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

export function requestModifyUserInfo(newData, userId) {
  // axios.defaults.withCredentials = true;
  const token = JSON.parse(localStorage.getItem("loginInfo")!).accessToken;
  // axios.defaults.withCredentials = true;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  console.log(newData, "!!!!!!!!!!!!!!!!!", userId, " 유저 아이디");
  const result = axios
    .patch(`${SERVER_URL}/patch-userInfo/${userId}`, {
      newData,
    })
    .then((res) => {
      console.log(res, "보관함 카드 리스트");
      if (res.status === 200) {
        return res.data;
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
