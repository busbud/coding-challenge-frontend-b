import * as actions from '../search.actions';
import { CLEAN_STORE } from '../../constants/actionTypes';

describe('cleanStore', () => {
    it('should return CLEAN_STORE', () => {
        expect(actions.cleanStore()).toEqual({
            type: CLEAN_STORE
        });
    })
})

describe('searchRequestSuccess', () => {
    it('should return SEARCH_REQUEST_SUCCESS and normalized data', () => {
        const data = {
            'departures': [
                {paris: 'montparnasse'},
                {bordeaux: 'pessac'}
            ],
            "locations": [
                {id: 12, name: 'paris 14'},
                {id: 22, name: 'centre'}
            ]
        }
        expect(actions.searchRequestSuccess(data)).toMatchSnapshot();
    })
})