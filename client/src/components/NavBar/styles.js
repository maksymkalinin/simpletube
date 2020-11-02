import { linkStyles } from '../../styles';

const styles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbarButton: {
    marginRight: theme.spacing(2),
  },
  menuButton: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: '160px',
    [theme.breakpoints.down('xs')]: {
      width: '200px',
    },
  },
  toolbar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  ...linkStyles(theme),
});

export default styles;