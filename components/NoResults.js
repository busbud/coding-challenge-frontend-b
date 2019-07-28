import { colours } from "../theme";

const NoResults = () => (
  <React.Fragment>
    <h2>Search for tickets above</h2>
    <style jsx>{`
      h2 {
        color: ${colours.blue};
        margin: 0;
        padding-left: 24px;
        padding-right: 24px;
        padding-top: 32px;
        text-align: center;
      }
    `}</style>
  </React.Fragment>
);

export default NoResults;
