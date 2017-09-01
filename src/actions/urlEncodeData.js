import URI from 'urijs';

export default function urlEncodeData(obj) {
	return Object.keys(obj)
		.reduce((mem, p) => {
			if (obj[p]) {
				mem.push(`${URI.encode(p)}=${URI.encode(obj[p])}`);
			}
			return mem;
		}, [])
		.join('&');
}
