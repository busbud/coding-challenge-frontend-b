import deepFreeze from 'deep-freeze';
import departures from '../departures'
import { CLEAN_STORE, SEARCH_REQUEST_SUCCESS } from '../../constants/actionTypes';

describe('departures Reduer', () => {
    it('should return the inital state', () => {
        expect(departures(undefined, {})).toEqual([])
    })

    describe('CLEAN_STORE', () => {
        it('should reset the store to empty array', () => {
            const INIT_STATE = [{departureId: '1'}, {departureId: '2'}];
            deepFreeze(INIT_STATE);
            expect(departures(INIT_STATE, {type: CLEAN_STORE})).toEqual([]);
        })
    })

    describe("SEARCH_REQUEST_SUCCESS", () => {
        it('should set the departures', () => {
            const INIT_STATE = [];
            const EXPECTED_STATE = [{departureId: '1'}, {departureId: '2'}];
            const action = {
                type: SEARCH_REQUEST_SUCCESS,
                departures: [{departureId: '1'}, {departureId: '2'}]
            }
            deepFreeze(INIT_STATE);
            expect(departures(INIT_STATE, action)).toEqual(EXPECTED_STATE);
        })
    });
})