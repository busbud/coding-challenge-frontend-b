/**
 *  sort() is the reducer here, use it to init the sorting
 **/
const sort = (state = 'departureDate', action) => {
    switch (action.type) {
        case 'CHANGE_SORT':
            return action.sort;
        default:
            return state;
    }
};

export default sort;