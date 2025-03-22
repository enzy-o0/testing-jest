// ~.spec.ts, ~.test.ts
// jest.config.js > testRegex -> 테스트 파일 확장자 바꾸고 싶을때
// default는 testRegex: /__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$

import obj from "./toStrictEqual";

// 객체끼리 비교할 때는 toStrictEqual
test("객체는 toStrictEqual로 비교한다. ", () => {
  expect(obj()).toStrictEqual({ a: "hello" }); // true
  // expect(obj()).not.toStrictEqual({ a: "hello" }); // true
  expect(obj()).not.toBe({ a: "hello" }); // true
});

test("배열끼리도 toStrictEqual 써야한다. ", () => {
  expect([1,2,3]).toStrictEqual([1,2,3]); // true
  expect([1,2,3]).not.toBe([1,2,3]); // true
});
