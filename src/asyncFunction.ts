export function okPromise() {
  return Promise.resolve("ok");
}

export function noPromise() {
  return Promise.reject("no");
}

// async는 return Promise로 반환함
export async function okAsync() {
  return "ok";
}
export async function noAsync() {
  throw "no";
}
