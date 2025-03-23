import { obj } from "./mockFunction";

// 파일 단위
beforeAll(() => {
  console.log("이 파일의 준비사항 실행"); // ex) db connection
});

// // 개별 테스트 단위
// beforeEach(() => {
//   console.log("각 테스트 전에 실행됨"); // 테스트 간의 공통 사항 ex) 변수 초기화,
// });

afterEach(() => {
  console.log("각 테스트 후에 실행됨"); // 테스트 후 정리 할 때 ex) mockClear
  // jest.spyOn 는 한번 심어두면 유지가 됨
  // 다음 테스트 시 spy 제거가 되어야 함

  // 1. 테스트 마다 넣어주기 const spyFn = jest.spyOn(obj, "minus");
  // mockClear - Times, With 초기화
  // mockReset - mockClear + mockImplementation(() => {})
  // mockRestore - 아예 spy를 전부 없애버림

  jest.restoreAllMocks();
});

afterAll(() => {
  console.log("모든 테스트가 끝난 후 "); // beforeAll에서 정의한 것 정리
});

// 테스트 그룹핑 - 원하는 테스트만 beforeEach, afterEach 적용할 수 있음
// 파일로 구분해도 됨
describe("beforeEach, afterEach 적용", () => {
  beforeEach(() => {
    console.log("각 테스트 전에 실행됨");
  });

  afterEach(() => {
    console.log("각 테스트 후에 실행됨");
  });
});

// test.skip("", () => {}) - 급해서 테스트 스킵하고 싶을 때 사용
// test.todo("", () => {}) - 나중에 테스트 만들기 위해

// describe.skip("", () => {}) - describe도 skip은 가능하나, todo는 없음
// it("", () => {}) - test 함수와 동일한 기능
// xit("", () => {}) - it.skip과 동일한 기능 = xtest
test("obj.minus 함수가 1번 호출되었다 (spy 삽입)", () => {
  // method 에 spy를 심음
  jest.spyOn(obj, "minus");
  const result = obj.minus(1, 2);
  console.log(obj.minus);
  expect(obj.minus).toHaveBeenCalledTimes(1); // true
  expect(result).toBe(-1);

  // const spyFn = jest.spyOn(obj, "minus");
  // spyFn.mockClear()
});

test("obj.minus 스파이를 심고 실행도 안되게", () => {
  // method 에 spy를 심음
  jest.spyOn(obj, "minus").mockImplementation();
  const result = obj.minus(1, 2);
  console.log(obj.minus);
  expect(obj.minus).toHaveBeenCalledTimes(1); // true
  expect(result).not.toBe(-1);
});

test("obj.minus 스파이를 심고 리턴값을 바꾸게", () => {
  // 모킹해서 함수 실제 호출 안되게하고 함수 만들 수 있음
  jest.spyOn(obj, "minus").mockImplementation(() => 5);
  const result = obj.minus(1, 2);
  console.log(obj.minus);
  expect(obj.minus).toHaveBeenCalledTimes(1); // true
  expect(result).toBe(5);
});

test("obj.minus 스파이를 심고 리턴값을 입력 받을 값으로 하게", () => {
  // 모킹해서 함수 실제 호출 안되게 함수 오버라이드 가능
  jest.spyOn(obj, "minus").mockImplementation((a, b) => a + b);
  const result = obj.minus(1, 2);
  console.log(obj.minus);
  expect(obj.minus).toHaveBeenCalledTimes(1); // true
  expect(result).toBe(3);
});

test("obj.minus 스파이를 심고 리턴값을 2번만 모킹하게", () => {
  // 모킹해서 함수 실제 호출 안되게 함수 오버라이드 가능
  // 한번만 모킹
  jest
    .spyOn(obj, "minus")
    .mockImplementationOnce((a, b) => a + b)
    .mockImplementationOnce(() => 5);

  const result1 = obj.minus(1, 2);
  const result2 = obj.minus(1, 2);
  const result3 = obj.minus(1, 2);

  console.log(obj.minus);
  expect(obj.minus).toHaveBeenCalledTimes(3); // true
  expect(result1).toBe(3);
  expect(result2).toBe(5);
  expect(result3).toBe(-1);
});

test("obj.minus 스파이를 심고 리턴값을 2번 모킹하고 오버라이드 리턴하게", () => {
  jest
    .spyOn(obj, "minus")
    .mockImplementationOnce((a, b) => a + b)
    .mockImplementationOnce(() => 5)
    .mockImplementation(() => 3);
  const result1 = obj.minus(1, 2);
  const result2 = obj.minus(1, 2);
  const result3 = obj.minus(1, 2);

  console.log(obj.minus);
  expect(obj.minus).toHaveBeenCalledTimes(3); // true
  expect(result1).toBe(3);
  expect(result2).toBe(5);
  expect(result3).toBe(3);
});

test("obj.minus 스파이를 심고 리턴하게 (mockReturnValue)", () => {
  jest.spyOn(obj, "minus").mockReturnValue(5);

  const result1 = obj.minus(1, 2);
  console.log(obj.minus);
  expect(obj.minus).toHaveBeenCalledTimes(1); // true
  expect(result1).toBe(5);
});

test("obj.minus 스파이를 심고 리턴하게 (mockReturnValueOnce)", () => {
  jest
    .spyOn(obj, "minus")
    .mockReturnValueOnce(5)
    .mockReturnValueOnce(3)
    .mockReturnValue(8);

  const result1 = obj.minus(1, 2);
  const result2 = obj.minus(1, 2);
  const result3 = obj.minus(1, 2);
  console.log(obj.minus);
  expect(obj.minus).toHaveBeenCalledTimes(3); // true
  expect(result1).toBe(5);
  expect(result2).toBe(3);
  expect(result3).toBe(8);
});
