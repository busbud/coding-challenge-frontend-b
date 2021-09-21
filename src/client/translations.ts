type Translations = {
  [key: string]: { [key: string]: string }
};

const translations: Translations = {
  en: {
    'options.language': 'Language',
    'options.currency': 'Currency',

    'header.title': 'Music & Arts Festival',
    'header.subtitle': 'Sepember 25th',

    'help.title': 'Need some help getting here?',
    'help.text.pre-select':
      'Here are buses from Québec to Montréal for',
    'help.text.post-select': 'on September 25th!',
    'help.text.person': 'person',
    'help.text.people': 'people',

    'list.loading.inprogress':
      'Loading... ' +
      'The perfect bus for you will be here shortly!',
    'list.loading.done':
      'Here are all your buses, take your pick!',
    'list.loading.no-results':
      'Sorry, there are no results.',

    'list.departure.departs': 'Departs',
    'list.departure.arrives': 'Arrives',
    'list.departure.class': 'Class'
  },

  fr: {
    'options.language': 'Langue',
    'options.currency': 'Monnaie',

    'header.title': 'Festival Musique Et Arts',
    'header.subtitle': '25 septembre',

    'help.title': 'Besoin d\'aide pour venir ici ?',
    'help.text.pre-select':
      'Voici les bus de Québec à Montréal pour',
    'help.text.post-select': 'le 25 septembre !',
    'help.text.person': 'personne',
    'help.text.people': 'personnes',

    'list.loading.inprogress':
      'Chargement...' +
      'Le bus parfait pour vous sera bientôt là !',
    'list.loading.done':
      'Voici tous vos bus, faites votre choix !',
    'list.loading.no-results':
      'Désolé, il n\'y a pas de résultats.',

    'list.departure.departs': 'Départs',
    'list.departure.arrives': 'Arrive',
    'list.departure.class': 'Classer'
  }
};

export default translations;
