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



 ### 회원정보/myrecipe

#### 회원정보
- 프로필등록 / 변경 , 비밀번호 변경, 전화번호 변경, 회원탈퇴기능

<img width="700" alt="스크린샷 2021-02-13 오후 4 57 41" src="https://user-images.githubusercontent.com/58800945/107903809-7e999b80-6f8d-11eb-88d0-c08fc2e7d7e6.png">

#### 
- 유저가 등록한 recipe list 확인 , carousel로 화면 recipe list 전환기능, recipe 클릭시 recipe 상세 page전환




<br/>
<br/> 

### 레시피 작성
 1. 레시피 정보 작성 , 순서(step)별 이미지 & 설명 등록 , 필수입력사항 미입력시 예외처리




### 카테고리별, 검색어별 레시피 목록확인
- 유저가 레시피를 등록할때 카테고리를 정할 수 있으며, 검색은 제목의 필터링을 통해 레시피를 검색한다


<br/>
<br/>


<br/>
<br/>

---
## 스키마

[스키마 dbdiagram 링크](https://dbdiagram.io/d/601bc54e80d742080a3925bd)

<img width="855" alt="스크린샷 2021-02-13 오후 4 38 35" src="https://user-images.githubusercontent.com/66257825/107844796-f6df5000-6e19-11eb-9975-5dd777a74fc6.png">

|1 (hasMany)| N (belongsTo)|
|:---:|:---:|
| users |contents|
| users |comments|
| users |labals |
| contents |comments|
| contents |images|
| categories | contents|

|N (belongsToMany)| N (belongsToMany)|
|:---:|:---:|
| users |labels|
| labels |users|


|N (belongsTo)| N |
|:---:|:---:|
| user_label |users|
| user_label |label|

---
API 



<br/>


---

## 기술 스택

### Front End

<br/>

- Framework


|이름|내용|
|:---:|:---:|
|리액트 | 컴포넌트기반으로 재사용성이 용이, 컴포넌트별 상태관리가 용이  |
|hooks| 상태관리 코드의 단순화, 컴포넌트간 데이터 공유시 편의성|

<br/>
<br/>

- Library


|이름|내용|
|:---:|:---:|
|axios | 서버 비동기 통신 |
|styled_componets | javascript 파일 내에서 CSS를 사용하여 별도의 CSS 파일 생성 불필요, 스타일컴포넌트에 props를 전달수있다|

<br/>
<br/>

- Tools


|이름|내용|
|:---:|:---:|
|figma |시스템아키텍쳐 설계 | 
|git|버전관리|
|ESlint| 협업간 코드style의 통일 목적|
|prettier| 협업간 코드style의 통일 목적 (airbnb)|


### Back End

- Framework

|이름|내용|
|:---:|:---:|
|Node js| 비동기 활용 퍼포먼스 증가 목적 |
|Express| 라우팅, Node js 효율적인 사용 목적 |

<br/>
<br/>

- Database

<img src="https://user-images.githubusercontent.com/66257825/107845928-bdf7a900-6e22-11eb-958e-48322bfdd014.png" width="200" height="200">



<br/>
<br/>

- Library



|이름|내용|
|:---:|:---:|
|Sequelize| database 관계 설정, ORM형식으로 DB CRUD 목적 |
|Multer S3| 레시피 이미지 S3 이미지 버켓에 저장목적 |
|crypto|유저 비밀번호 암호화 저장 목적|




<br/>
<br/>

- Deploy





|이름|내용|
|:---:|:---:|
|AWS S3| 이미지 전용 버킷 / 레시피, 유저 아바타 사진 관리 목적 |
|AWS EC2|가상 서버를 구축, 보안 및 네트워크 구성, 스토리지 관리 목적 |
|AWS RDS|배포용 DB / 데이터베이스 저장 목적|
|AWS ROUTE 53| Homemade 도메인 연결 목적 |
|AWS ELB|네트워크 트래픽 분산을 통한 애플리케이션 확장성 개선 목적|
|AWS certificate manager|HTTPS 제공, 보안 콘텐츠 제공 목적|
|PM2|NodeJS 프로세서 관리, 무중단 서비스 운영 목적 |

 
<br/>
<br/>

- Tools






|이름|내용|
|:---:|:---:|
|gitbook| API 문서 작성 목적 |
|dbdiagram| 스키마 테이블 기획, 관계구성 표현 목적 |
|postman| API 작동 테스트 목적 |
|git|버전관리|
|ESlint| 협업간 코드style의 통일 목적|
|prettier| 협업간 코드style의 통일 목적 (airbnb)|

<br/>
<br/>


---

