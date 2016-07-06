
/**
 *  currency() is the reducer here, use it to init the currency
 **/
const currency = (state = 'CAD', action) => {
    switch (action.type) {
        case 'TOGGLE_CURRENCY':
            return action.currency;
        default:
            return state;
    }
};

export default currency;