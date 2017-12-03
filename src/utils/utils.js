const utils = {
  parseTime: function(rawDate) {
    const date = new Date(Date.parse(rawDate));
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`
  }
};


export default utils;
