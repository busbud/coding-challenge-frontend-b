export default theme => ({
  root: {
    height: '4.4rem',
    flexGrow: 1,
  },
  toolbar: {
    height: '100%',
    padding: 0,
    paddingTop: `${theme.spacing.unit}px`,
    paddingBottom: `${theme.spacing.unit}px`,
  },
  item: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
});
