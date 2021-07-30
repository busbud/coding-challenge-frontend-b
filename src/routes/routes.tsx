import SearchView from "../views/Search/search.component";
import DeparturesView from "../views/Departures/departures.component";

const routes = () => [
  {
    // label: t("nav.scores"),
    label: "Search",
    path: "/",
    component: SearchView,
    exact: true,
  },
  {
    // label: t("nav.standings"),
    label: "Departures",
    path: "/departures",
    component: DeparturesView,
    exact: true,
  },
];

export default routes;
