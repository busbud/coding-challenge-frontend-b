import detectBrowserLanguage from 'detect-browser-language'

const translations = {
  'en-US' : {
    title: "It will be hot this summer in Montreal with the Osheaga festival! , check what Busbud have for you to Enjoy this awesome festival!",
    btn:"Show me all the Departures, please!",
    origin:"Origin",
    destination:"Destination",
    at:"at",
    to:"to",
    loading:"Loading..."
  },
  'fr':{
    title: "Ça va être chaud cet été à Montréal avec le festival Osheaga! , vérifiez ce que Busbud a pour vous de profiter de ce festival génial!",
    btn:"Montre-moi tous les départs, s'il te plaît!",
    origin:"Origine",
    destination:"Destination",
    at:"à",
    to:"à",
    loading:"Chargement en cours ..."
  },
  'fr-CA':{
    title: "Ça va être chaud cet été à Montréal avec le festival Osheaga! , vérifiez ce que Busbud a pour vous de profiter de ce festival génial!",
    btn:"Montre-moi tous les départs, s'il te plaît!",
    origin:"Origine",
    destination:"Destination",
    at:"à",
    to:"à",
    loading:"Chargement en cours ..."
  },
  'fr-FR':{
    title: "Ça va être chaud cet été à Montréal avec le festival Osheaga! , vérifiez ce que Busbud a pour vous de profiter de ce festival génial!",
    btn:"Montre-moi tous les départs, s'il te plaît!",
    origin:"Origine",
    destination:"Destination",
    at:"à",
    to:"à",
    loading:"Chargement en cours ..."
  },
  'default' : {
    title: "It will be hot this summer in Montreal with the Osheaga festival! , check what Busbud have for you to Enjoy this awesome festival!",
    btn:"Show me all the Departures, please!",
    origin:"Origin",
    destination:"Destination",
    at:"at",
    to:"to",
    loading:"Loading..."
  }
}    

const Language = (key) => {
    return translations[translations[detectBrowserLanguage()]===undefined ? 'default' : detectBrowserLanguage()][key];
}

export default Language;