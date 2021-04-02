export function splitScript(script: string) {
  let result: any[] = [];
  if (script) {
    result = script.split(".");
    console.log(result, "대사쪼개기");
    return result;
  } else {
    return alert("카드 내용이 없습니다.");
  }
}
