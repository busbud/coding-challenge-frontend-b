export default theme => ({
  departure: {
    textAlign: 'left',
  },
  duration: {
    textAlign: 'center',
  },
  arrival: {
    textAlign: 'right',
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});
