beforeEach(() => {
  jest.useFakeTimers();
});

it.only("openHandles", () => {
  // 무한 반복
  // test leaking 원인 찾기
  // setInterval(() => {
  //   console.log("hi");
  // });

  expect(1).toBe(1);
});

afterAll(() => {
  // 타이머는 detectOpenHandles로 모든 원인을 찾기 쉽지 않음
  jest.clearAllTimers();
  // db.close()
});
