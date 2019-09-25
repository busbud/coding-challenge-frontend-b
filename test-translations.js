let verifyEquals = require("./verify-equals-translations.js");

let inputs = ["All departures", "Departure", "One way", ""];
let outputs = ["Tous les départs", "Départ", "Aller simple", undefined];

let translate = x => {
  let y;
  switch (x) {
    case "All departures":
      return (y = "Tous les départs");
    case "Departure":
      return (y = "Départ");
    case "Departures":
      return (y = "Départs");
    case "Departure Date":
      return (y = "Date de départ");
    case "Destination":
      return (y = "Destination");
    case "Passengers":
      return (y = "Passagers");
    case "Search Bus":
      return (y = "Trouver un bus");
    case "One way":
      return (y = "Aller simple");
    case "Round Trip":
      return (y = "Aller-retour");
    case "1 adult":
      return (y = "1 adulte");
    case "1 child":
      return (y = "1 enfant");
    case "1 senior":
      return (y = "1 60ans et plus");
    case "Montreal":
      return (y = "Montréal");
    case "Departure time:":
      return (y = "Heure du départ:");
    case "Arrival time:":
      return (y = "Heure d'arrivée:");
    case "Price:":
      return (y = "Prix:");
    case "clear":
      return (y = "effacer");
    case "Travel the world & protect the environment":
      return (y = "Voyage à travers le monde & protège l'environnement");
    case "search":
      return (y = "rechercher");
    case "< back":
      return (y = "< précédent");
    case "next >":
      return (y = "suivant >");
  }

  return y;
};
function runTest(i) {
  let expected = outputs[i];
  let actual = translate(inputs[i]);
  verifyEquals(expected, actual); // verifyEquals is imported above
}

runTest(0);
runTest(1);
runTest(2);
runTest(3);

console.log("All tests passed for " + __filename);
