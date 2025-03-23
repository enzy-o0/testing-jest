// commonjs - jest mock은 호이스팅 됨
// __mocks__ 파일 안에 해당 파일이 있으면 그 파일 참조
jest.mock("./module");

import { obj } from "./module";

// 모킹 함수를 오버라이드 할 수 있음  - default import
// jest.mock("./module", () => {
//   return {
//     obj: {} // obj import는 여기가 갈아끼워짐
//     props: "hello",
//   };
// });

// method3만 모킹 오버라이드를 하고 싶을 때
jest.mock("./module", () => {
  return {
    ...jest.requireActual("./module"),
    obj: {
      ...jest.requireActual("./module").obj,
      method3() {
        return jest.fn();
      },
    },
  };
});

test("모듈을 전부 모킹", () => {
  // jest.spyOn(obj, "method");
  // jest.spyOn(obj, "method1");
  // jest.spyOn(obj, "method2");
  // jest.spyOn(obj, "method3");

  // 속성 수정도 가능
  jest.replaceProperty(obj, "prop", "replaced");
  console.log(obj);
});
