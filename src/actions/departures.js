import Busbud from '../services/busbud'

const busbud = new Busbud();

export const LOAD_DEPARTURE_DATA = 'LOAD_DEPARTURE_DATA'


export const getDepartures = (originHash,destinationHash,outboundDate) => {
    
        return (dispatch) => {
           busbud.getDepartures(originHash,destinationHash,outboundDate)
           .then( response => {
               
                console.log(response['data'])

                dispatch({
                    type:LOAD_DEPARTURE_DATA,
                    payload: response['data']
                })
           }).catch()
        } 
    }