import { timer } from "./callback";

// TIP
// 콜백 함수는 테스트 안하는 것이 좋음
// 콜백 함수가 있다면 Promise로 바꾸어 테스트 방식을 통일하는 것이 좋음
test("타이머 잘 실행되나? 콜백 테스트", (done) => {
  timer((message: string) => {
    expect(message).toBe("success");
    // 비동기 테스트를 멈추고 싶을 때

    // jest 자체에서는 테스트가 5초안에 끝나야 하는데, 10초 처리해서 에러남
    done();
  });
}, 50_000);

// runAllTimers 사용은 useFakeTimers 필수
test("타이머 빨리 끝나라 ", (done) => {
  // expect 실행 횟수 - 비동기일 때 콜백 실행이 되는지 확신을 위함
  expect.assertions(1);
  jest.useFakeTimers();
  timer((message: string) => {
    expect(message).toBe("success");
    // 비동기 테스트를 멈추고 싶을 때
    done();
  });

  // jest.runAllTimers();

  // 타이머 시간보다 적으면 안됨, 10초로 해두어서 10초 이상으로
  jest.advanceTimersByTime(10_000); // 10초 흐르게
});
