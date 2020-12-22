import axios from "axios";
const token = "PARTNER_BaASYYHxTxuOINEOMWq5GA";

export  const fetchDepartures=(pathparams)=> {
    const {date, index, isPolling=false,adult='',child='',senior='',lang='',currency=''}= pathparams;
      return axios({
        method: 'GET',
        url: `https://napi.busbud.com/x-departures/f2m673/f25dvk/${date}${
            isPolling === true ? `/poll?index${index}` : '?'
          }adult=${adult}&child=${child}&senior=${senior}&lang=${lang}&currency=${currency}`,
    
      headers: {
        Accept:
          "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
        "X-Busbud-Token": `${token}`,
      },
    },
    
  ).then(res => {
    return res.data;
  });
}
