const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  inputPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '80%',
    height: '320px',
    maxHeight: 'calc(90% - 64px)',
    backgroundColor: theme.palette.grey[200],
    border: '2px dashed',
    borderColor: theme.palette.grey[300],
    '&:focus': {
      outline: '2px solid ' + theme.palette.grey[400],
    }
  }
})

export default styles;