import { types } from '../actions/';

export default function getStateDiff(action) {
	switch (action.type) {
		case types.fetchTickets: {
			return { complete: false };
		}
		case types.generalError: {
			return { complete: true, safe: true, tickets: [] };
		}
		case types.fetchTicketsSuccess: {
			return { ...action.payload, safe: !!action.payload.tickets.length };
		}
		default: {
			return { ...(action.payload || {}) };
		}
	}
}
