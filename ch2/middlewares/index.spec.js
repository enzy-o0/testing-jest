const {isLoggedIn, isNotLoggedIn} = require('./');

describe('isLoggedIn', () => {
    test('로그인을 했으면 next를 호출한다', () => {
        const req = {
            isAuthenticated() {
                // 가짜 데이터 모킹
                // 로그인을 한 상태면 true를 반환
                return true;
            }
        }
        const res = {};
        // next가 호출된건지 궁금한 상황이기 때문
        const next = jest.fn();
        isLoggedIn(req, res, next)
        expect(next).toHaveBeenCalledTimes(1);
    }),
      test('로그인을 안 한 상태면, 403 로그인 필요를 응답한다', () => {
        const req = {
            isAuthenticated() {
                // 로그인을 안 한 상태면 false 반환
                return false;
            }
        }
        const res = {
            // 메서드 체이닝을 위함. this = res
            status: jest.fn(() => res),
            send: jest.fn()
        };
        // next가 호출된건지 궁금한 상황이기 때문
        const next = jest.fn();
        isLoggedIn(req, res, next)
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalledWith('로그인 필요');
    })
})
describe('isNotLoggedIn', () => {
    test('로그인을 안 한 상태면 next를 호출한다', () => {
        const req = {
            isAuthenticated() {
                // 로그인을 안 한 상태면 false 반환
                return false;
            }
        }
        const res = {};
        // next가 호출된건지 궁금한 상황이기 때문
        const next = jest.fn();
        isNotLoggedIn(req, res, next)
        expect(next).toHaveBeenCalledTimes(1);
    }),
    test('로그인을 한 상태면 next를 호출한다', () => {
        const req = {
            isAuthenticated() {
                // 로그인을 한 상태면 true를 반환
                return true;
            }
        }
        const res = {
            redirect: jest.fn()
        };
        // next가 호출된건지 궁금한 상황이기 때문
        const next = jest.fn();
        isNotLoggedIn(req, res, next)
        expect(next).not.toHaveBeenCalled();
        // 실패 후, Received 값을 가져다 쓰는것도 방법..!
        // expect(res.redirect).toHaveBeenCalledWith('/?error=%EB%A1%9C%EA%B7%B8%EC%9D%B8%ED%95%9C%20%EC%83%81%ED%83%9C%EC%9E%85%EB%8B%88%EB%8B%A4.');
        expect(res.redirect).toHaveBeenCalledWith(`/?error=${encodeURIComponent('로그인한 상태입니다.')}`);
    })
})