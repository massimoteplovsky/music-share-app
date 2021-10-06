import React, { useState, useEffect, useContext, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import ReactPlayer from 'react-player';
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
  const playerRef = useRef();
  const [played, setPlayed] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [position, setPosition] = useState(0);

  const { title, artist, thumbnail, url, id } = state.song;

  useEffect(() => {
    const currentPosition = queue.findIndex((song) => song.id === id);
    setPosition(currentPosition);
  }, [queue, id]);

  useEffect(() => {
    const nextSong = queue[position + 1];

    if (played === 1 && nextSong) {
      setPlayed(0);
      dispatch({ type: 'SET_SONG', payload: nextSong });
      return;
    }

    if (played === 1) {
      dispatch({ type: 'STOP_SONG' });
    }
  }, [dispatch, played, position, queue]);

  const handleTogglePlay = () => {
    dispatch({ type: state.isPlaying ? 'STOP_SONG' : 'PLAY_SONG' });
  };

  const handleProgressChanged = (event, newValue) => {
    setPlayed(newValue);
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekMouseUp = () => {
    setSeeking(false);
    playerRef.current.seekTo(played);
  };

  const handleSongEnd = () => {
    setPlayed(1);
  };

  const handlePrevSong = () => {
    const prevSong = queue[position - 1];

    if (prevSong) {
      dispatch({ type: 'SET_SONG', payload: prevSong });
    }

    if (!prevSong && queue.length) {
      dispatch({ type: 'SET_SONG', payload: queue[queue.length - 1] });
    }
  };

  const handleNextSong = () => {
    const nextSong = queue[position + 1];

    if (nextSong) {
      dispatch({ type: 'SET_SONG', payload: nextSong });
    }

    if (!nextSong && queue.length) {
      dispatch({ type: 'SET_SONG', payload: queue[0] });
    }
  };

  const formatSeconds = (seconds) => {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
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
            <IconButton onClick={handlePrevSong}>
              <SkipPrevious />
            </IconButton>
            <IconButton onClick={handleTogglePlay}>
              {state.isPlaying ? (
                <Pause className={cx.playIcon} />
              ) : (
                <PlayArrow className={cx.playIcon} />
              )}
            </IconButton>
            <IconButton onClick={handleNextSong}>
              <SkipNext />
            </IconButton>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              {formatSeconds(playedSeconds)}
            </Typography>
          </div>
          <Slider
            onMouseDown={handleSeekMouseDown}
            onMouseUp={handleSeekMouseUp}
            onChange={handleProgressChanged}
            value={played}
            min={0}
            max={1}
            step={0.01}
          />
        </div>
        <ReactPlayer
          ref={playerRef}
          onProgress={({ played, playedSeconds }) => {
            if (!seeking) {
              setPlayed(played);
              setPlayedSeconds(playedSeconds);
            }
          }}
          onEnded={handleSongEnd}
          url={url}
          playing={state.isPlaying}
          hidden
        />
        <CardMedia className={cx.thumbnail} image={thumbnail} />
      </Card>
      <QueueSongList queue={queue} />
    </>
  );
}

export default SongPlayer;
