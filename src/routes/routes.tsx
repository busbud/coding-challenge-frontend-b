import SearchView from "../views/Search/search.view";
import DeparturesView from "../views/Departures/departures.view";

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
