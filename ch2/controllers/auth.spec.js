const { join } = require('./auth')
const User = require('../models/user')
const bcrypt = require('bcrypt');

describe('join', () => {
    it('이메일이 없으면 프론트로 no_email 에러를 쿼리스트링으로 보낸다', async () => {
        const req = {
            body: {
                email: '',
                password: 'qwer1234',
                nick: 'ej'
            }
        }
        const res = {
            redirect: jest.fn()
        };
        const next = jest.fn();
        await join(req, res, next);
        expect(res.redirect).toHaveBeenCalledWith('/join?error=no_email');
    })

    it('닉네임이 없으면 프론트로 no_nick 에러를 쿼리스트링으로 보낸다', async () => {
        const req = {
            body: {
                email: 'ej@gmail.com',
                password: 'qwer1234',
            }
        }
        const res = {
            redirect: jest.fn()
        };
        const next = jest.fn();
        await join(req, res, next);
        expect(res.redirect).toHaveBeenCalledWith('/join?error=no_nick');
    })

    it('비밀번호가 없으면 프론트로 no_password 에러를 쿼리스트링으로 보낸다', async () => {
        const req = {
            body: {
                email: 'ej@gmail.com',
                nick: 'ej'
            }
        }
        const res = {
            redirect: jest.fn()
        };
        const next = jest.fn();
        await join(req, res, next);
        expect(res.redirect).toHaveBeenCalledWith('/join?error=no_password');
    })


    it('이미 가입한 이메일이면 에러를 띄운다', async () => {
        const req = {
            body: {
                email: 'ej@gmail.com',
                password: 'qwer1234',
                nick: 'ej'
            }
        }
        const res = {
            redirect: jest.fn()
        };
        const next = jest.fn();
        const fn1 = jest.spyOn(User, 'findOne').mockResolvedValue({ id: 1 });
        const fn2 = jest.spyOn(User, 'create').mockImplementation();
        await join(req, res, next);
        expect(res.redirect).toHaveBeenCalledWith('/join?error=exist');
        expect(fn2).not.toHaveBeenCalled();
    })


    // 이렇게 광범위한 테스트면, 비동기 위주로 에러 확인.
    it('회원가입 도중에 에러가 발생하면 에러를 응답한다', async () => {
        const req = {
            body: {
                email: 'ej@gmail.com',
                password: 'qwer1234',
                nick: 'ej'
            }
        }
        const res = {
            redirect: jest.fn()
        };
        const next =  jest.fn();
        const fn1 = jest.spyOn(User, 'findOne').mockResolvedValue({ id: 1 });
        const fn2 = jest.spyOn(User, 'create').mockImplementation();
        await join(req, res, next);
        expect(res.redirect).toHaveBeenCalledWith('/join?error=exist');
        expect(fn2).not.toHaveBeenCalled();
    })

    it('이미 가입한 이메일이면 아니면 회원가입을 진행한다 (암호화 후 디비 저장)', async () => {
        const req = {
            body: {
                email: 'ej@gmail.com',
                password: 'qwer1234',
                nick: 'ej'
            }
        }
        const res = {
            redirect: jest.fn()
        };
        const next =  jest.fn();
        const fn1 = jest.spyOn(User, 'findOne').mockResolvedValue(null);
        const fn2 = jest.spyOn(User, 'create').mockImplementation();
        const fn3 = jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed');

        // 요런식으로 값을 저장해서 재사용하는 방법이 있지만, 권장하지 않음
        // let hashed;
        // let hashBeforeMock = bcrypt.hash;
        // jest.spyOn(bcrypt, 'hash').mockImplementation(async (data, salt) => {
        //     hashed = await hashBeforeMock(data, salt);
        //     return hashed;
        // });

        await join(req, res, next);
        expect(res.redirect).toHaveBeenCalledWith('/');
        expect(fn2).toHaveBeenCalledWith({
            email: 'ej@gmail.com',
            // password: hashed,
            password: 'hashed',
            nick: 'ej'
        });
    
    })

})