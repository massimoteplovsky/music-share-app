import React, { useState, useContext, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_OR_REMOVE_FROM_QUEUE } from '../graphql/mutations';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { PlayArrow, Save, Pause } from '@material-ui/icons';
import { SongContext } from '../context';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(3),
  },
  songInfoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  songInfo: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  thumbnail: {
    objectFit: 'cover',
    width: 140,
    height: 140,
  },
}));

const Song = ({ songDetails }) => {
  const cx = useStyles();
  const { state, dispatch } = useContext(SongContext);
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: (data) => {
      localStorage.setItem('songs', JSON.stringify(data.addOrRemoveFromQueue));
    },
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const { title, artist, thumbnail, id } = songDetails;

  useEffect(() => {
    const isPlaying = state.isPlaying && id === state.song.id;
    setIsPlaying(isPlaying);
  }, [id, state.song.id, state.isPlaying]);

  const handleTogglePlay = () => {
    dispatch({ type: 'SET_SONG', payload: songDetails });
    dispatch({ type: 'TOGGLE_PLAY_SONG' });
  };

  const handleAddOrRemoveFromQueue = () => {
    addOrRemoveFromQueue({
      variables: { input: { ...songDetails, __typename: 'Song' } },
    });
  };

  console.log(isPlaying, songDetails.title);

  return (
    <Card className={cx.container}>
      <div className={cx.songInfoContainer}>
        <CardMedia className={cx.thumbnail} image={thumbnail} />
        <div className={cx.songInfo}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body1" component="p">
              {artist}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton size="small" color="primary" onClick={handleTogglePlay}>
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton
              onClick={handleAddOrRemoveFromQueue}
              size="small"
              color="secondary"
            >
              <Save />
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  );
};

export default Song;
