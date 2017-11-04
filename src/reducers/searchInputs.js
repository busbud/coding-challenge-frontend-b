import { 
    UPDATE_SEARCH_DATE,
    UPDATE_SEARCH_LANGUAGE
} from '../actions'

const searchInputState = {
    originHash: 'dr5reg',
    destinationHash: 'f25dvk',
    outboundDate: '2018-08-02',
    adults: 1,
    child: 0,
    lang: 'US',
    currency: 'USD'
}

export default (state = searchInputState, action) =>{
    switch(action.type){
        case UPDATE_SEARCH_DATE:
            return {
                ...state,
                outboundDate : action.payload 
            }
        case UPDATE_SEARCH_LANGUAGE:
            let lang =  action.payload.toUpperCase()
            
            if(lang === 'EN'){
                lang = 'US'
            }

            return {
                ...state,
                lang
            }
        default:
            return state
    }
}