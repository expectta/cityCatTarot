export function currentTime() {
  const time = `${new Date()
    .getHours()
    .toString()} 시 ${new Date().getMinutes().toString()}분`;
  return time;
}
