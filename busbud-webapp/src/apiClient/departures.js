export const getDepartures = async () => {
    try {
        let res = await fetch('/api/departures');
        return await res.json();
    } catch (e) {
        return null;
    }
};
