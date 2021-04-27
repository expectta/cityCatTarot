import axios from "axios";

const SERVER_URL = "http://3.36.182.36:8080";
//모든 카드 리스트
export function requestCardList() {
  const result = axios
    .get(`${SERVER_URL}/tarotChat`)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      } else {
        alert("데이터가 없습니다");
      }
    })
    .catch((err) => {});
  return result;
}
//유저 로그인
export function requestLogin(email: string, password: string) {
  const result = axios
    .post(`${SERVER_URL}/session`, { email: email, password: password })
    .then((res) => {
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
//회원가입
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
      if (res.status === 201) {
        return true;
      } else {
        alert("데이터가 없습니다");
      }
    })
    .catch((err) => {
      return false;
    });
  return result;
}

//카드 보관함 저장요청
export function requestPostCard(
  userId,
  cardId,
  cardCategory,
  cardImageUrl,
  cardTitle,
  cardDetail,
  userIndputSubject
) {
  const token = JSON.parse(localStorage.getItem("loginInfo")!).accessToken;
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
      if (res.status === 201) {
        return true;
      } else {
        alert("데이터가 없습니다");
      }
    })
    .catch((err) => {
      return false;
    });
  return result;
}
//보관함에 저장된 카드리스트 요청
export function requestMyCardList(userId) {
  const token = JSON.parse(localStorage.getItem("loginInfo")!).accessToken;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const result = axios
    .get(`${SERVER_URL}/inventory/get-card/${userId}`)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      } else {
        alert("데이터가 없습니다");
      }
    })
    .catch((err) => {
      return false;
    });
  return result;
}
//보관함에 저장된 카드 삭제 요청
export function requestMyCardDelete(inventoryId) {
  const token = JSON.parse(localStorage.getItem("loginInfo")!).accessToken;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const result = axios
    .delete(`${SERVER_URL}/inventory/delete-card/${inventoryId}`)
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        alert("데이터가 없습니다");
      }
    })
    .catch((err) => {
      return false;
    });
  return result;
}

//유저정보 요청
export function requestUserInfo(userId) {
  const token = JSON.parse(localStorage.getItem("loginInfo")!).accessToken;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const result = axios
    .get(`${SERVER_URL}/users/${userId}`)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      } else {
        alert("데이터가 없습니다");
      }
    })
    .catch((err) => {
      return false;
    });
  return result;
}
//유저 정보수정 요청
export function requestModifyUserInfo(newData, userId) {
  const token = JSON.parse(localStorage.getItem("loginInfo")!).accessToken;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const result = axios
    .patch(`${SERVER_URL}/patch-userInfo/${userId}`, newData)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      } else {
        alert("데이터가 없습니다");
      }
    })
    .catch((err) => {
      return false;
    });
  return result;
}
