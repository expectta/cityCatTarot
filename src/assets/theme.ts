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
  flexCenter: `
    display: flex;
    justify-contents: center;
    align-items: center;
  `,
  flexCenterColumn: `
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
	`,
  //기본 버튼 (파란색)
  defaultButton: `
		background:#6f6eff;
		font-size:1rem;
		color:white;
		padding: 5px 20px 5px 20px;
    border: none;
		border-radius: 20px;
		outline:0px;
		cursor:pointer;
    text-decoration: none;
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
  // 기본 Input 태그
  defaultInput: `
	border: none;
	border-bottom: 1px solid #bcbcbc;
	color:#bcbcbc;
	outline: none;
	&:focus{
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #6f6eff;
  }
    border-bottom: 2px solid #6f6eff;
    color: #6f6eff;;
	}
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
