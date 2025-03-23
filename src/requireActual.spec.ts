jest.mock("./mockFunc");
jest.mock("./mockClass");

import func from "./mockFunc";
import c from "./mockClass";

it("func와 c가 정의되어 있어야 한다", () => {
  console.log(func, new c().methodA, new c().methodB);

  const original = jest.requireActual("./mockFunc");
  console.log(original);
  // toBeDefined - undefined만 아니면 된다
  expect(func).toBeDefined();
  expect(c).toBeDefined();
});
