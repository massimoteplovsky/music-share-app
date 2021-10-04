import React from 'react';
import { Avatar, Typography, IconButton, makeStyles } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridAutoColumns: 'column',
    gridTemplateColumns: '50px auto 50px',
    gridGap: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    height: 44,
    width: 44,
  },
  text: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  songInfoContainer: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
}));

const QueuedSong = ({ title, artist, thumbnail }) => {
  const cx = useStyles();
  return (
    <div className={cx.container}>
      <Avatar className={cx.avatar} src={thumbnail} alt="Song thumbnail" />
      <div className={cx.songInfoContainer}>
        <Typography className={cx.text} variant="subtitle1">
          {title}
        </Typography>
        <Typography className={cx.text} color="textSecondary" variant="body2">
          {artist}
        </Typography>
      </div>
      <IconButton>
        <Delete color="error" />
      </IconButton>
    </div>
  );
};

export default QueuedSong;
