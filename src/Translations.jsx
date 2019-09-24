let t = x => {
  let y;
  switch (x) {
    case "All departures":
      return (y = "Tous les départs");
    case "Departure":
      return (y = "Départ");
    case "Departures":
      return (y = "Départs");
    case "Destination":
      return (y = "Destination");
    case "Passengers":
      return (y = "Passagers");
    case "Search for buses":
      return (y = "Trouver des bus");
    case "One way":
      return (y = "Aller simple");
    case "Round Trip":
      return (y = "Aller-retour");
    case "adult":
      return (y = "adulte");
    case "child":
      return (y = "enfant");
    case "senior":
      return (y = "60ans et plus");
    case "Montreal":
      return (y = "Montréal");
    case "Departure time:":
      return (y = "Heure du départ:");
    case "Arrival time:":
      return (y = "Heure d'arrivée:");
    case "Price:":
      return (y = "Prix:");
    case "Clear search":
      return (y = "Effacer la recherche");
    case "Travel the world & protect the environment":
      return (y = "Voyage à travers le monde & protège l'environnement");
    case "Search Bus":
      return (y = "Trouver un bus");
    case "back":
      return (y = "précédent");
    case "next":
      return (y = "suivant");
  }

  return y;
};

let geohashCity = cityName => {
  let geohash;
  if (cityName === "New York") {
    geohash = "dr5reg";
  }
  if (cityName === "Montreal" || cityName === "Montréal") {
    geohash = "f25dvk";
  }
  return geohash;
};
export { t, geohashCity };
