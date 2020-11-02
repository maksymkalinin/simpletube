import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function VideoCard (props) {
  const { classes, video, handleClick } = props;
  const { thumbnailUrl, filename: videoName, meta = {} } = video;
  const { originalName } = meta;

  return (
    <Grid item sm={4} xs={6}>
      <Card className={classes.card} onClick={handleClick} elevation={0} >
        <CardActionArea className={classes.cardActionArea} >
          <CardMedia
            component="img"
            image={thumbnailUrl}
          />
        </CardActionArea>
        <CardContent>
          <Typography variant="subtitle2" component="p" >
            {originalName || videoName}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

VideoCard.propTypes = {
  classes: PropTypes.object.isRequired,
  video: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default VideoCard;