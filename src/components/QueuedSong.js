import React, { useContext } from 'react';
import { Avatar, Typography, IconButton, makeStyles } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useMutation } from '@apollo/react-hooks';
import { ADD_OR_REMOVE_FROM_QUEUE } from '../graphql/mutations';
import { SongContext } from '../context';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridAutoColumns: 'column',
    gridTemplateColumns: '50px auto 50px',
    gridGap: 12,
    alignItems: 'center',
    marginTop: 10,
    padding: 5,
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
  activeSong: {
    border: '1px solid #ffffff',
    borderRadius: '5px',
  },
}));

const QueuedSong = ({ songDetails }) => {
  const cx = useStyles();
  const { title, artist, thumbnail } = songDetails;
  const {
    state: { song },
  } = useContext(SongContext);
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: (data) => {
      localStorage.setItem('songs', JSON.stringify(data.addOrRemoveFromQueue));
    },
  });

  const handleAddOrRemoveFromQueue = () => {
    addOrRemoveFromQueue({
      variables: { input: { ...songDetails, __typename: 'Song' } },
    });
  };

  return (
    <div
      className={`${cx.container} ${
        song.id === songDetails.id ? cx.activeSong : null
      }`}
    >
      <Avatar className={cx.avatar} src={thumbnail} alt="Song thumbnail" />
      <div className={cx.songInfoContainer}>
        <Typography className={cx.text} variant="subtitle1">
          {title}
        </Typography>
        <Typography className={cx.text} color="textSecondary" variant="body2">
          {artist}
        </Typography>
      </div>
      <IconButton onClick={handleAddOrRemoveFromQueue}>
        <Delete color="error" />
      </IconButton>
    </div>
  );
};

export default QueuedSong;
