import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import VideoCard from './VideoCard';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

function VideoList (props) {
  const { classes, videos, openVideo } = props;

  return (
    <Grid container spacing={2}>
      {videos.map((video, index) => (
        <VideoCard
          key={video.filename + index}
          classes={classes}
          video={video}
          handleClick={openVideo.bind(null, video)}
        />
      ))}
    </Grid>
  )
};

VideoList.propTypes = {
  videos: PropTypes.array.isRequired,
  openVideo: PropTypes.func.isRequired,
}

export default withStyles(styles)(VideoList);