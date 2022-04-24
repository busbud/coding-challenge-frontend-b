export const formatLocalTime = (date) => {
    const d = new Date(date);

    return d.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });
};
