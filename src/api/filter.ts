import {Departure} from "../store/reducer";
import moment from "moment";

export const filterDepartures = (filter: number, departures: Departure[]) => {
    switch (filter) {
        case 0: {
            let sortByCheapest = departures.sort((a: Departure, b: Departure) => a.price - b.price);
            return sortByCheapest
        }
        case 1: {
            let sortByQuickest = departures.sort((a: Departure, b: Departure) => a.duration - b.duration);
            return sortByQuickest
        }
        case 2: {
            let sortByEarliest = departures.sort((a: Departure, b: Departure) => parseInt(moment(a.departure_time).format('X')) - parseInt(moment(b.departure_time).format('X')));
            return sortByEarliest
        }
        case 3: {
            let sortByLatest = departures.sort((a: Departure, b: Departure) => parseInt(moment(b.departure_time).format('X')) - parseInt(moment(a.departure_time).format('X')));
            return sortByLatest
        }
        default: {
            return departures
        }
    }
};
