import counterpart from "counterpart";

counterpart.registerTranslations("en", {
  menu: {
    travel_to_oshgea: "Find my path to Oshega",
    travel_to_anywhere: "Travel anywhere",
    about: "About d'Osheaga",
    language: {
      label: "Language",
      helper: "Display language"
    }
  },
  header: {
    logo: {
      text_before: "Travel to",
      alt: "Oshega logo"
    }
  },
  pages: {
    travel: {
      img_alt: "Travel any where",
      description_text: "dasdasda"
    },
    travel_oshega: {
      img_alt: "Travel to Oshega",
      description_text: ""
    }
  },
  travel: {
    search: {
      selection_title: "Search criteria",
      result_title: {
        found:
          "%(numberOfDeparture)s journey(s) found from %(townOrigin)s to %(townDestination)s on the %(dateSearched)s",
        not_found: "No journey found",
        nothing_done: "No research done",
        in_progess: "Search in progress"
      },
      selection: {
        from: "From",
        to: "to",
        when: "When",
        search_button: "Find the best bus journeys !"
      },
      result: {
        journey_action_label: "Jump on this bus !"
      }
    }
  }
});
