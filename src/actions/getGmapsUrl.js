import { encode } from 'urijs';

export default function getGmapsUrl(query) {
	if (!query) {
		return '';
	}
	return `https://www.google.com/maps/search/?api=1&query=${encode(query.split(' ').join('+'))}`;
}
