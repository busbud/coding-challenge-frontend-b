import counterpart from "counterpart";

counterpart.registerTranslations("fr", {
  menu: {
    travel_to_oshgea: "Trouver mon chemin vers Oshega",
    travel_to_anywhere: "Voyager partout",
    about: "À propos d'Osheaga",
    language: {
      label: "Langue",
      helper: "Langage d'affichage"
    }
  },
  header: {
    logo: {
      text_before: "Voyage vers",
      alt: "logo d'Oshega"
    }
  },
  pages: {
    travel: {
      img_alt: "Voyager vers Oshega",
      title: ""
    },
    travel_oshega: {
      img_alt: "Voyager vers Oshega",
      title: ""
    }
  },
  travel: {
    search: {
      selection_title: "Critères de recherche",
      result_title: {
        found:
          "%(numberOfDeparture)s trajet(s) trouvé(s) du %(townOrigin)s à %(townDestination)s pour le %(dateSearched)s",
        not_found: "Aucun trajet trouvé",
        nothing_done: "Aucun recherche n'a été effectué"
      },
      selection: {
        from: "De",
        to: "À",
        when: "Le",
        search_button: "Trouvez les meilleurs trajets en bus !"
      },
      result: {
        journey_action_label: "Monter dans ce bus !"
      }
    }
  }
});
