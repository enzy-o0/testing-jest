// ~.spec.ts, ~.test.ts
// jest.config.js > testRegex -> 테스트 파일 확장자 바꾸고 싶을때
// default는 testRegex: /__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$

import { obj } from "./toMatchObject";

// 객체 생성 클래스가 다를 떄
test("클래스 비교는 toMatchObject를 써야한다>", () => {
  expect(obj("hello")).toMatchObject({ a: "hello" }); // true
  expect(obj("hello")).not.toStrictEqual({ a: "hello" }); // true
});
