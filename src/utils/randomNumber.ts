export function randomNumber(chatType: number) {
  console.log(chatType, " μΉ΄λ νμ");
  let result = 0;
  if (chatType === 0) {
    result = Math.floor(Math.random() * (22 - 0) + 0);
  }
  if (chatType === 1) {
    result = Math.floor(Math.random() * (44 - 23) + 23);
  }
  return result;
}
