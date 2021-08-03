import { lazy } from "react";

const SearchView = lazy(() => import("../views/Search/search.view"));
const DeparturesView = lazy(
  () => import("../views/Departures/departures.view")
);

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
