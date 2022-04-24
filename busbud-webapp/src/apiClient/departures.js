export const getDepartures = async (options) => {
    const queryArgs = new URLSearchParams(options);

    try {
        let res = await fetch(`/api/departures/?${queryArgs.toString()}`);
        return await res.json();
    } catch (e) {
        return null;
    }
};
