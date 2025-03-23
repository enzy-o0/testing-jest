// new Date 테스트 하는 법
import { after3days } from "./date";

test("3일 후를 리턴 한다", () => {
  jest.useFakeTimers().setSystemTime(new Date(2025, 2, 23));
  // const date = new Date();
  // date.setDate(date.getDate() + 3);

  console.log(new Date());
  expect(after3days()).toStrictEqual(new Date(2025, 2, 26));
});

afterEach(() => {
  // useFakeTimers를 사용하고, 항상 useRealTimers 되돌려주어야 함
  // cf) jest.runAllTimers - 타이머 바로 실행하게 해줌
  //     jest.advanceTimersByTime
  //    jest.clearAllTimers
  jest.useRealTimers();
});

// toBeCloseTo
// 부동소수점 문제
test("0.1 + 0.2 = 0.3", () => {
  // expect(0.1 + 0.2).toBe(0.3);
  expect(0.1 + 0.2).toBeCloseTo(0.3);
});
