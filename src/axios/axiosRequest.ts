import axios from "axios";

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
