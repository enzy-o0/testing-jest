// jest.fn()
// import { okPromise, noPromise, okAsync, noAsync } from "./asyncFunction";

// spyOn 활용을 위함
import * as fns from "./asyncFunction";

// promise resolves를 테스트 하기 위해서는 return 해줘야함
// return이 없으면 resolve 되기 전에 테스트가 끝나버림
test("okPromise 테스트 - return 활용", () => {
  const okSpy = jest.fn(fns.okPromise);
  // expect(okSpy()).resolves.toBe("ok"); // 성공
  //  expect(okSpy()).resolves.toBe("no"); // 실패여야 하는데, 성공함 (메세지는 실패로 뜸)
  return expect(okSpy()).resolves.toBe("ok");
});

test("okPromise 테스트 - spyOn 활용", () => {
  // jest.spyOn(fns, "okPromise");
  // jest.spyOn(fns, "okPromise").mockReturnValue(Promise.resolve("ok"));
  jest.spyOn(fns, "okPromise").mockResolvedValue("ok");
  return expect(fns.okPromise()).resolves.toBe("ok");
});

test("okPromise 테스트 - then 활용", () => {
  const okSpy = jest.fn(fns.okPromise);
  return okSpy().then((result) => {
    expect(result).toBe("ok");
  });
});

test("okPromise 테스트 - async await 활용 (return 없어도 됨)", async () => {
  const okSpy = jest.fn(fns.okPromise);
  const result = await okSpy();
  expect(result).toBe("ok");
});

test("noPromise 테스트 - catch 활용", () => {
  const noSpy = jest.fn(fns.noPromise);
  return noSpy().catch((result) => {
    expect(result).toBe("no");
  });
});

test("noPromise 테스트 - reject 활용", () => {
  const noSpy = jest.fn(fns.noAsync);
  return expect(noSpy()).rejects.toBe("no");
});

test("noPromise 테스트 - spyOn 활용", () => {
  // jest.spyOn(fns, "noPromise").mockReturnValue(Promise.reject("no"));
  jest.spyOn(fns, "noPromise").mockRejectedValue("no");
  return expect(fns.noPromise()).rejects.toBe("no");
});

test("noPromise 테스트 - async await 활용 (try catch)", async () => {
  const noSpy = jest.fn(fns.noPromise);
  try {
    const result = await noSpy();
  } catch (err) {
    expect(err).toBe("no");
  }
});

test("okAsync 테스트 - return 활용", () => {
  const okSpy = jest.fn(fns.okAsync);
  return expect(okSpy()).resolves.toBe("ok");
});

test("okAsync 테스트 - then 활용", () => {
  const okSpy = jest.fn(fns.okAsync);
  return okSpy().then((result) => {
    expect(result).toBe("ok");
  });
});

test("okAsync 테스트 - async await 활용 (return 없어도 됨)", async () => {
  const okSpy = jest.fn(fns.okAsync);
  const result = await okSpy();
  expect(result).toBe("ok");
});
