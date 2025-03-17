
// ESM 사용 NODE_OPTIONS="$NODE_OPTIONS --experimental-vm-modules" npx jest
// react에서는 바벨이 import > require로 만들어줌
import sum from './toBeJS';

test('sum 함수는 두  숫자를 더해야 한다', () => {
    expect(sum(1,2)).toBe(3);
});
