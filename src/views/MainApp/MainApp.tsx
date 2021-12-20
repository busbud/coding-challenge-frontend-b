import { RouteComponentProps } from "@reach/router";
import { CssBaseline } from "@mui/material";
import StoreProvider from 'components/StoreProvider';
import Search from 'components/Search';
import DepartureList from 'components/DepartureList';

const MainApp = (props: RouteComponentProps): JSX.Element  => {
  return (
    <StoreProvider>
      <CssBaseline />
      <Search />
      <DepartureList />
    </StoreProvider>
  );
}

export default MainApp;
