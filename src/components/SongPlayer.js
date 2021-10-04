import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Slider,
  CardMedia,
  makeStyles,
} from '@material-ui/core';
import { SkipPrevious, PlayArrow, SkipNext } from '@material-ui/icons';

//Components
import QueueSongList from './QueuedSongList';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 15px',
  },
  content: {
    flex: '1 0 auto',
  },
  thumbnail: {
    width: 150,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

function SongPlayer() {
  const cx = useStyles();
  return (
    <>
      <Card className={cx.container} variant="outlined">
        <div className={cx.details}>
          <CardContent className={cx.content}>
            <Typography variant="h5" component="h3">
              Title
            </Typography>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              Artist
            </Typography>
          </CardContent>
          <div className={cx.controls}>
            <IconButton>
              <SkipPrevious />
            </IconButton>
            <IconButton>
              <PlayArrow className={cx.playIcon} />
            </IconButton>
            <IconButton>
              <SkipNext />
            </IconButton>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              00:01:30
            </Typography>
          </div>
          <Slider min={0} max={1} step={0.01} />
        </div>
        <CardMedia
          className={cx.thumbnail}
          image="https://i.pinimg.com/236x/ef/53/43/ef5343540e4be864d90a33e9e17cc314--james-hetfield-my-favorite-music.jpg?nii=t"
        />
      </Card>
      <QueueSongList />
    </>
  );
}

export default SongPlayer;
