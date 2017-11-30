export const getDepartures = (origin, destination, outboundDate) => {
  return {
    type: 'GET_DEPARTURES_REQUESTED',
    origin,
    destination,
    outbound_date: outboundDate,
  }
}

export const updateDepartures = (origin, destination, outboundDate, index) => {
  return {
    type: 'UPDATE_DEPARTURES_REQUESTED',
    origin,
    destination,
    outbound_date: outboundDate,
    index,
  }
}

export const receiveDepartures = (data) => {
  return {
    type: 'GET_DEPARTURES_RECEIVED',
    data,
  }
}

// export function loadVideo(videoId, interactionType, videoSettings = {}) {
//   return {
//     type            : Event.LOAD_VIDEO,
//     xid             : videoId,
//     interactionType: InteractionType.exists(interactionType) ? interactionType : InteractionType.USER,
//     videoSettings   : sanitize(videoSettings),
//   }
// }