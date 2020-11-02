const styles = theme => ({
  paperModal: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    transform: 'translate(0, -50%)',
    maxWidth: '70%',
    maxHeight: '90%',
    margin: 'auto',
    padding: theme.spacing(1),
    overflowY: 'auto',
    '&:focus': {
      border: 'none',
      outline: 'none',
    }
  },
  modalVideo: {
    backgroundSize: 'fill',
  },
  modalCloseButton: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(4),
  }
})

export default styles;