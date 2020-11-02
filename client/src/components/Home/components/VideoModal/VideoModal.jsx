import React from 'react';
import PropTypes from 'prop-types';

import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/CloseOutlined';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

function VideoModal(props) {
  const { classes, video, handleClose } = props;
  const { videoUrl, meta = {} } = video || {};

  const maxHeight = (window.innerHeight * 0.9 | 0);
  const maxWidth = (window.innerWidth * 0.7 | 0);

  const videoHeight = meta.height > maxHeight ? maxHeight : meta.height;
  const videoWidth = meta.width > maxWidth ? maxWidth : meta.width;

  return (
    <Modal
      open={!!video}
      onClose={handleClose}
    >
      <Paper elevation={3} className={classes.paperModal}>
        <video 
          controls
          src={videoUrl}
          className={classes.modalVideo}
          height={videoHeight}
          width={videoWidth}
        />
        <IconButton
          color="inherit"
          aria-label="close video"
          edge="end"
          onClick={handleClose}
          className={classes.modalCloseButton}
        >
          <CloseIcon />
        </IconButton>
      </Paper>
    </Modal>
  )
}

VideoModal.propTypes = {
  video: PropTypes.object,
  handleClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(VideoModal);