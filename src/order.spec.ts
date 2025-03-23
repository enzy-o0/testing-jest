import { first, second, third } from "./order";

// 함수 호출 순서
test("first > second > third", () => {
  const spy1 = jest.fn(first);
  const spy2 = jest.fn(second);
  const spy3 = jest.fn(third);

  // spy1();
  (spy1 as any)(1, 2, 3);
  spy2();
  (spy1 as any)("hello");
  spy3();
  spy1();

  console.log(spy1.mock.invocationCallOrder[0]);
  console.log(spy2.mock.invocationCallOrder[0]);
  console.log(spy3.mock.invocationCallOrder[0]);

  // 함수 인수 값 확인 가능
  // toHaveBeenCalledWith는 spy1.mock.calls, toHaveBeenCalledTimes는 spy1.mock.calls.length 값
  console.log(spy1.mock.calls);

  // 가독성을 위해  https://jest-extended.jestcommunity.dev/ 설치해주면 좋음 !
  expect(spy1.mock.invocationCallOrder[0]).toBeLessThan(
    spy2.mock.invocationCallOrder[0]
  );

  expect(spy3.mock.invocationCallOrder[0]).toBeGreaterThan(
    spy2.mock.invocationCallOrder[0]
  );
});

// 함수 호출 순서
test("first > second > third - jest extension 사용", () => {
  const spy1 = jest.fn(first);
  const spy2 = jest.fn(second);
  const spy3 = jest.fn(third);

  // spy1();
  (spy1 as any)(1, 2, 3);
  spy2();
  (spy1 as any)("hello");
  spy3();
  spy1();

  expect(spy1).toHaveBeenCalledBefore(spy2);
  expect(spy3).toHaveBeenCalledAfter(spy2);
});

test("인수의 일부 테스트", () => {
  const fn = jest.fn();
  fn({
    a: {
      b: {
        c: "hello",
      },
      d: "bye",
    },
    e: ["f"],
  });
  // expect(fn).toHaveBeenCalledWith({
  //   a: {
  //     b: {
  //       c: "hello",
  //     },
  //     d: "bye",
  //   },
  //   e: ["f"],
  // });


  // 가장 중요한 인수 활용하는 것이 좋음
  // 전체 인수가 너무 긴 경우 활용하면 좋음
  expect(fn.mock.calls[0][0].a.b.c).toBe("hello");
});
