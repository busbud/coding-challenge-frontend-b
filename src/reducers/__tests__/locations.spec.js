
import deepFreeze from 'deep-freeze';
import locations from '../locations'
import { CLEAN_STORE, SEARCH_REQUEST_SUCCESS } from '../../constants/actionTypes';

describe('locations Reduer', () => {
    it('should return the inital state', () => {
        expect(locations(undefined, {})).toEqual({})
    })

    describe('CLEAN_STORE', () => {
        it('should reset the sotre to empty object', () => {
            const INIT_STATE = {'1': {id: '1'}, '2': {id: '2'}};
            deepFreeze(INIT_STATE);
            expect(locations(INIT_STATE, {type: CLEAN_STORE})).toEqual({});
        })
    })

    describe("SEARCH_REQUEST_SUCCESS", () => {
        it('should set the locations', () => {
            const INITIAL_STATE = {};
            const EXPECTED_STATE = {'1': {id: '1'}, '2': {id: '2'}};
            const action = {
                type: SEARCH_REQUEST_SUCCESS,
                locations: {'1': {id: '1'}, '2': {id: '2'}}
            }
            deepFreeze(INITIAL_STATE);
            expect(locations(INITIAL_STATE, action)).toEqual(EXPECTED_STATE);
        })
    })
})