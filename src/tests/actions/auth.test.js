import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';

import * as fetchModule from '../../helpers/fetch';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {}

let store = mockStore( initState );

Storage.prototype.setItem = jest.fn();


describe('Tests on actions Auth', () => {

    beforeEach( () => {
        store = mockStore( initState );
        jest.clearAllMocks();
    })


    test('startLogin Correct', async() => {

        await store.dispatch( startLogin('anel@anel.com', '123456'));

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                name: expect.any( String ),
                uid: expect.any( String )
            }
        });


        expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any( String ));
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any( Number ));
    })

    test('should Register a new student', async() => {

        fetchModule.fetchWithoutToken = jest.fn( () => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'gabriel',
                    token: 'abcesfnfrnfrjjr'
                }
            }
        }))

        await store.dispatch( startRegister('test@test.com', '123456', 'Test'));

        const actions = store.getActions();


        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                name: expect.any( String ),
                uid: expect.any( String )
            }
        })

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'abcesfnfrnfrjjr');
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any( Number ));
    });
    
    
})