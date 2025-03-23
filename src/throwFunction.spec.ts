import { error, customError, CustomError } from "./throwFunction";

test("error가 잘 난다", () => {
  // expect(error).toThrow(Error);
  // error()에서 에러가 나서 toThrow를 실행할 수 없음
  // 그래서 함수형태로 error를 return 함
  expect(() => error()).toThrow(Error);
  expect(() => customError()).toThrow(CustomError);
});

test("error가 잘 난다 - try/catch", () => {
  try {
    error();
  } catch (err) {
    // err는 객체 형태
    expect(err).toStrictEqual(new Error());
  }
});
