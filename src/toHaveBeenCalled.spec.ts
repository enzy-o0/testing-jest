import { sum, obj } from "./toHaveBeenCalled";

// toHaveBeenCalled는 사실상 테스트에 의미가 없음
test("sum 함수가 호출되었다", () => {
  // sum(1, 2);

  // sum 함수의 행동을 spy 한다는 의미
  const sumSpy = jest.fn(sum);
  sumSpy(1, 2);
  expect(sumSpy).toHaveBeenCalled(); // true
});

test("sum 함수가 1번 호출되었다", () => {
  const sumSpy = jest.fn(sum);
  sumSpy(1, 2);
  expect(sumSpy).toHaveBeenCalledTimes(1); // true
});

// 함수 인수 테스트
test("sum 함수가 1,2 와 함께 호출되었다 (spy 함수 생성)", () => {
  // 새로움 spy 함수를 만들음
  const sumSpy = jest.fn(sum);
  sumSpy(1, 2);
  expect(sumSpy).toHaveBeenCalledWith(1, 2); // true
});

test("obj.minus 함수가 1번 호출되었다 (spy 삽입)", () => {
  // method 에 spy를 심음
  jest.spyOn(obj, "minus");
  const result = obj.minus(1, 2);
  console.log(obj.minus);
  expect(obj.minus).toHaveBeenCalledTimes(1); // true
  expect(result).toBe(-1);
});
