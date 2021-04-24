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
![화면 기록 2021-04-24 오후 5 20 24](https://user-images.githubusercontent.com/58800945/115953382-1a173180-a526-11eb-9a8f-c1c4dd4582b1.gif)
<img width="855" alt="스크린샷 2021-02-13 오후 4 56 57" src="https://user-images.githubusercontent.com/58800945/115953382-1a173180-a526-11eb-9a8f-c1c4dd4582b1.gif">
![화면 기록 2021-04-24 오후 5 20 24](https://user-images.githubusercontent.com/58800945/115953451-97db3d00-a526-11eb-8694-5a7cfec2663f.gif)


### 채팅화면
- 메인화면에서 확인 할 수 있는 정보 : 최근 등록된 레시피, 이번달 최고의 레시피, 금주의 탑 4 레시피
- 메인화면에서 사용할 수 있는 기능 :  카테고리별 레시피 목록 page이동, 검색어별 레시피 목록 page이동, 회원정보 버튼, 회원가입 버튼
<img width="855" alt="스크린샷 2021-02-13 오후 4 56 57" src="https://user-images.githubusercontent.com/58800945/107901966-78ed8700-6f88-11eb-90f0-0d1850a7bdbb.png">


1 . 최근등록된 레시피 확인

<img width="855" alt="스크린샷 2021-02-13 오후 4 56 57" src="https://user-images.githubusercontent.com/58800945/107902337-78092500-6f89-11eb-8762-c3b40b9e2a9c.png">

2 . 이번달 최고의 레시피

<img width="855" alt="스크린샷 2021-02-13 오후 4 56 57" src="https://user-images.githubusercontent.com/58800945/107902437-c74f5580-6f89-11eb-9486-04ba26aa7f95.png">

3 . 금주의 탑 4레시피

<img width="855" alt="스크린샷 2021-02-13 오후 4 56 57" src="https://user-images.githubusercontent.com/58800945/107902513-0087c580-6f8a-11eb-89d0-e5919ea45aba.png">


 ### 회원가입/로그인
- 사용자의 잘못된입력(email 형식, passord 8자이상, 전화번호 형식)을 유효성 검사를 통해 예외처리함.

<img width="550" height="400" alt="스크린샷 2021-02-13 오후 4 56 57" src="https://user-images.githubusercontent.com/58800945/107902870-ffa36380-6f8a-11eb-9a07-b44e011c3d0f.png">
<img width="300" height="400" alt="스크린샷 2021-02-13 오후 4 56 57" src="https://user-images.githubusercontent.com/58800945/107902691-81df5800-6f8a-11eb-85ac-0458d971bb5b.png">
<img width="300" height="400" alt="스크린샷 2021-02-13 오후 4 57 19" src="https://user-images.githubusercontent.com/58800945/107902715-902d7400-6f8a-11eb-9c5d-9fef50aff1e1.png">

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

