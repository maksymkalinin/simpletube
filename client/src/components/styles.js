const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(2) + 64,
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(6),
    paddingLeft: theme.spacing(2) + 160,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(2),
    },
    minHeight: '100vh',
  }
});

export default styles;