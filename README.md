# 시티타로 캣
배포 링크 : http://citycattarot.ga/

- 오늘의 타로와 연애타로 점을 볼수 있고 로그인을 통해 내가 봤던 카드를 보관하여 다시 볼 수있는 플랫폼.



---


### position

**Front End : 김지운**

|이름|담당|설명|
|:---:|:---:|:---:|
|김지운|Front End |유저 회원가입, 로그인 , 회원정보 변경, 타로점 채팅창, 보관함|

<br/>
<br/>

**Back End : 이소연**

|이름|담당|설명|
|:---:|:---:|:---:|
|이소연|Back End|자바 스프링 서버, 서버배포|

---

## 시스템 아키텍쳐
[시스템 아키텍쳐](https://www.figma.com/file/nCiqEww5eb2fL19BPb7Z2w/Untitled?node-id=0%3A1)

![image](https://user-images.githubusercontent.com/58800945/115952444-e685d880-a520-11eb-916e-edff7461b574.png)

### 메인화면
![화면 기록 2021-04-24 오후 5 20 24](https://user-images.githubusercontent.com/58800945/115953451-97db3d00-a526-11eb-8694-5a7cfec2663f.gif)


### 채팅화면
- 오늘의 타로, 썸 타로 버튼별 22장씩 카드가 있음
- 채팅이 시작되면 시티 캣(봇)의 인삿말을 시작으로 대화 형식의 타로 점을 본다.
- 봇의 채팅글은 문장단위로 끊어져 1초 딜레이 후 생성된다.
- 유저에게 카드를 볼것인지 의사를 묻는다.
![화면 기록 2021-04-24 오후 6 15 52](https://user-images.githubusercontent.com/58800945/115953981-6748d280-a529-11eb-9509-abb03ecb34d1.gif)

### 보관함
- 오늘 본 카드는 제목을 삽입하여 저장
- 보관함에서 카드의 내용 확인
- 보관함 카드 삭제
![화면 기록 2021-04-24 오후 6 26 42](https://user-images.githubusercontent.com/58800945/115954243-da9f1400-a52a-11eb-99ba-003a2a7dd0bb.gif)



### 회원가입/로그인/사용자 정보변경
 - 회원가입 시 email 형식 유효성 검사
 - 비밀번호 문자 + 숫자 + 특수기호 유효성검사
 - 로그인 후 사용자 정보변경
 - 
  ![화면 기록 2021-04-24 오후 6 32 54](https://user-images.githubusercontent.com/58800945/115954445-0d95d780-a52c-11eb-9f99-115f6c8c2d1d.gif)




## 기술 스택

### Front End

- Library


|이름|내용|
|:---:|:---:|
|리액트 | 컴포넌트기반으로 재사용성이 용이, 컴포넌트별 상태관리가 용이  |
|axios | 서버 비동기 통신 |
|styled_componets | javascript 파일 내에서 CSS를 사용하여 별도의 CSS 파일 생성 불필요, 스타일컴포넌트에 props를 전달수있다|
|react-scroll-to-bottom|채팅 화면에서 '봇'의 채팅글이 랜더링 될 때 스크롤을 항상 최 하단으로 유지하기 위함|
|typescript |데이터 타입에 대한 정확한 명시를 통해 코드의 오류를 줄인다.| 

<br/>




