import React from 'react';
import Dropzone from 'react-dropzone';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { axios } from '../../utils';
import { useSnackbar } from 'notistack';
import { CircularProgress } from '@material-ui/core';

function UploadPage (props) {
  const { classes } = props;
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = React.useState(false);

  const handleDrop = async (acceptedFiles) => {
    if (!acceptedFiles || !acceptedFiles.length) {
      return;
    }

    setLoading(true);

    const filesToUpload = new FormData();
    acceptedFiles.forEach(file => filesToUpload.append('files', file));

    try {
      const { data: result } = await axios.post('/video/upload', filesToUpload);

      if (result.length) {
        result.forEach(({type, message, error}) => {
          if(type === 'error') {
            enqueueSnackbar(error.message, { variant: 'error' });
          } else {
            enqueueSnackbar(message, { variant: 'success' });
          }
        })
      }
    } catch(err) {
      console.error(err);
      enqueueSnackbar(err.message, { variant: 'error' });
    }

    setLoading(false);
  }

  return (
    <main className={classes.root}>
      {
        loading
          ? <CircularProgress />
          : <Dropzone onDrop={handleDrop} accept="video/*" >
              {({getRootProps, getInputProps}) => (
                <Paper {...getRootProps()} className={classes.inputPaper} elevation={0}>
                  <input {...getInputProps()} />
                  <Typography variant="body1">Drag 'n' drop some files here, or click to select files</Typography>
                </Paper>
              )}
            </Dropzone>
      }
    </main>
  )
}

export default withStyles(styles)(UploadPage);