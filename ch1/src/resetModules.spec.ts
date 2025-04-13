beforeEach(() => {
  // 한번 import 할 때 생기는 cache를 날려주는 역할
  // 각 테스트는 다른 테스트에 영향을 주지 않고, 독립적이어야 좋음
  jest.resetModules();
});

it("first import", async () => {
  // dynamic import
  const c = await import("./mockClass"); // require('./mockClass')
  (c as any).prop = "hello";

  expect(c).toBeDefined();
});

// it.only 사용해서 체크할 수 있음 - 파일 전체 테스트 돌아갈 때
it("second import", async () => {
  const c = await import("./mockClass");
  expect((c as any).prop).not.toBe("hello");
});
