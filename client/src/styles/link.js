const styles = (theme) => ({
  customLink: {
    textDecoration: 'none',
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    '&.active-nav-link': {
      backgroundColor: 'rgba(0, 0, 0, 0.06)'
    },
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
  },
  primaryButtonLink: {
    color: theme.palette.primary.main
  },
  invertedPrimaryButtonLink: {
    color: theme.palette.common.white
  }
});

export default styles;