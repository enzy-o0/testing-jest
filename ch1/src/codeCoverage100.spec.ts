import { codeCoverage100 } from "./codeCoverage100"

describe('codeCoverage100', () => { 
  it('cond1과 cond2 모두 true면 obj.a.b를 리턴한다', () => {
    expect(codeCoverage100(true, true).toStrictEqual({
      a: { b: 'inner'}
    }))
  }) 

  it('cond1은 false고 cond2가 true면 obj를 리턴한다', () => {
    // 타입스크립트에서 에러남 
    expect(codeCoverage100(false, true).toThrow(TypeError))
  }) 
})