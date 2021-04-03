const pixelToRem = (size: number) => `${size / 16}rem`;

// fontSize
const fontSizes = {
  small: pixelToRem(14), // 0.8rem
  base: pixelToRem(16), // 1rem
  lg: pixelToRem(18),
  xl: pixelToRem(20),
  xxl: pixelToRem(22),
  xxxl: pixelToRem(24),
  titleSize: pixelToRem(50), //3.1rem
};

//디바이스 사이즈
const deviceSizes = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "700px",
  tablet: "820px",
  tabletL: "1024px",
};

// 디바이스별 미디어쿼리
const device = {
  mobileS: `only screen and (max-width: ${deviceSizes.mobileS})`,
  mobileM: `only screen and (max-width: ${deviceSizes.mobileM})`,
  mobileL: `only screen and (max-width: ${deviceSizes.mobileL})`,
  tablet: `only screen and (max-width: ${deviceSizes.tablet})`,
  tabletL: `only screen and (max-width: ${deviceSizes.tabletL})`,
};

// 자주 사용하는 색
const colors = {
  black: "#000000",
  gray: "#bcbcbc",
  green: "#3cb46e",
  blue: "#8c80ff",
};

// element의 base 디자인
const common = {
  defaultInput: `
	margin-top: 5px;
	display: block;
	width: 100%;
	height: 40px;
	border: 1px solid lightgray;
	border-radius: 3px;
	`,
  defaultButton: `
	border-radius: 4px;
  font-weight: bold;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 3px;
  margin-bottom: 5px;
  display: block;
  width: 100%;
  height: 40px;
  background: #0b0b20;
  color: white;
  border: 1px solid lightgray;
	`,
  flexCenterColumn: `
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
	`,

  //미선택 버튼 (회색)
  unclickedButtonStyle: `
	background:#d8d8d8;
		color:white;
		padding: 5px 20px 5px 20px;
    border: none;
		border-radius: 20px;
		outline:0px;
		text-decoration: none;
		cursor:pointer;
  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: #6f6eff;
		color: #fff;
		
  }
	`,
  //앨범 카드 스타일
  albumCardDiv: `
	width:150px;
	height:150px
	border-radius: 15px 15px 15px 15px;
	box-shadow: 0px 0px 5px #c8c8c8;
	`,
  //section 기본 스타일
  contentCardDiv: `
	width:100%;
	height:100%;
	border: 0px;
	border-radius: 15px 15px 15px 15px;
  box-shadow: 0px 0px 5px #c8c8c8;	`,
  // section title 기본 슽타일
  contentTitle: `
	font-size:${fontSizes.xl};
	width:100%; 
	height:10%;
	color:#bcbcbc;
	padding-top:30px;
	`,
  stateCardDiv: `
	border-radius: 15px 15px 15px 15px;
  box-shadow: 0px 0px 5px #c8c8c8;	
	`,
  avatarImageDiv: `
	width: auto;
	height: 100%;
	`,
  stateDiv: `
	background:#6f6eff;
		font-size:1rem;
		color:white;
    border: none;
		border-radius: 5px;
		padding: 3px 10px 3px 10px;
	`,
  noticeCardDiv: `
	width:96%;
	height:60px;
	margin:0 auto;
	border-radius: 8px 8px 8px 8px;
	margin-top: 1%;
	margin-bottom: 2%;
	box-shadow: 0px 0px 5px #c8c8c8;
	`,
  defaultCardDiv: `
	widht:100%;
	height:100%;
	border-radius: 15px 15px 15px 15px;
  box-shadow: 0px 0px 5px #c8c8c8;
	`,
};

const theme = {
  fontSizes,
  colors,
  common,
  device,
  deviceSizes,
};

export default theme;
