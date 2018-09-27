function generate_table(results) {
  const body = document.getElementsByTagName('tbody')[0];
  results.forEach((res) => {
    const row = document.createElement('tr');
    for (j=0; j<4; j++) {
      const cell = document.createElement('td');
      cell.innerText = res[j];
      row.appendChild(cell);
    }
    body.appendChild(row);
  });
}

// Request
const url = "https://napi.busbud.com/x-departures/dr5reg/f25dvk/2018-08-02";
const options = {
  headers: {
    'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
    'X-Busbud-Token': 'PARTNER_IoysifKUTZqIEyiBCLprjQ'
  }
};

fetch(url, options).then(res => res.json()).then(results => {
  const dataset = results.departures.map(dep => {
    const id = dep.destination_location_id;
    const location = results.locations.find(loc => loc.id == id);
    const row = [];
    row.push(dep.departure_time.slice(11,-3));
    row.push(dep.arrival_time.slice(11,-3));
    row.push(location.name + ", " + location.address[0].replace('"',''));
    row.push(dep.prices.currency +" "+ parseInt(dep.prices.total,10)/100);
    return row;
  });
  generate_table(dataset);
});

