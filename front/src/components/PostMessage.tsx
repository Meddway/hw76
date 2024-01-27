import React from 'react';
import {Grid, Paper, Typography} from '@mui/material';

interface Props {
  message: string;
  author: string;
  datetime: string;
}

const PostMessage: React.FC<Props> = ({ message, author, datetime }) => {
  return (
    <Grid item xs={12}>
      <Paper elevation={3} style={{ padding: '10px', marginBottom: '10px' }}>
        <div>
          <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
            Author: {author}
          </Typography>
          <Typography variant="subtitle1">
            Date: {datetime}
          </Typography>
        </div>
        <Typography variant="body1">
          Message: {message}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default PostMessage;
