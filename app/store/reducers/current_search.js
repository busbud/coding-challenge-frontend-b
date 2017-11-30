const defaultState = {
  origin: '',
  destination: '',
  outbound_date: '',
}

const currentSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_DEPARTURES_REQUESTED':
      return {
        ...state,
        ...action
      }
    default:
      return state
  }
}

export default currentSearch