export function splitScript(script: string) {
  let result: any[] = [];
  if (script) {
    result = script.split(".");
    result.pop();
    return result;
  } else {
  }
}
