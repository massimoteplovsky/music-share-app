import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Slider,
  CardMedia,
  makeStyles,
} from '@material-ui/core';
import { SkipPrevious, PlayArrow, SkipNext, Pause } from '@material-ui/icons';
import { SongContext } from '../context';
import { GET_QUEUED_SONGS } from '../graphql/queries';

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
  const { state, dispatch } = useContext(SongContext);
  const {
    data: { queue },
  } = useQuery(GET_QUEUED_SONGS);

  const { title, artist, duration, thumbnail } = state.song;

  const handleTogglePlay = () => {
    dispatch({ type: 'TOGGLE_PLAY_SONG' });
  };

  return (
    <>
      <Card className={cx.container} variant="outlined">
        <div className={cx.details}>
          <CardContent className={cx.content}>
            <Typography variant="h5" component="h3">
              {title}
            </Typography>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              {artist}
            </Typography>
          </CardContent>
          <div className={cx.controls}>
            <IconButton>
              <SkipPrevious />
            </IconButton>
            <IconButton onClick={handleTogglePlay}>
              {state.isPlaying ? (
                <Pause className={cx.playIcon} />
              ) : (
                <PlayArrow className={cx.playIcon} />
              )}
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
        <CardMedia className={cx.thumbnail} image={thumbnail} />
      </Card>
      <QueueSongList queue={queue} />
    </>
  );
}

export default SongPlayer;
