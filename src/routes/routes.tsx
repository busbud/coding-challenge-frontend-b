import SearchView from "../views/Search/search.view";
import DeparturesView from "../views/Departures/departures.view";

const routes = (t) => [
  {
    label: t("nav.scores"),
    path: "/",
    component: SearchView,
    exact: true,
  },
  {
    label: t("nav.standings"),
    path: "/departures",
    component: DeparturesView,
    exact: true,
  },
];

export default routes;
