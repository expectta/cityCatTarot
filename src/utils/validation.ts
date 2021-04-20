// 입력값이 존재하는지 여부 확인
export function isEmpty(value): boolean {
  return value.length === 0;
}
export function moreThanLength(str, n): boolean {
  return str.length >= n;
}
// 영어 또는 숫자만 가능
export function onlyNumberAndEnglish(str): boolean {
  return /^[A-Za-z][A-Za-z0-9]*$/.test(str);
}
// 최소 8자 이상하면서, 알파벳과 숫자 및 특수문자(@$!%*#?&) 는 하나 이상 포함
export function strongPassword(str): boolean {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?+='"&-])[A-Za-z\d@$!%*#?+='"&-]{8,}$/.test(
    str
  );
}
export function isPhoneNumber(num): boolean {
  return /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(num);
}
export function isEmail(str): boolean {
  return /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(
    str
  );
}
