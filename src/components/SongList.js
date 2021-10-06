import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { useSubscription, useMutation } from '@apollo/react-hooks';
import { GET_SONGS } from '../graphql/subscriptions';
import { ADD_OR_REMOVE_FROM_QUEUE } from '../graphql/mutations';

// Components
import Song from './Song';

const useStyles = makeStyles((theme) => ({
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50,
  },
}));

const SongList = () => {
  const cx = useStyles();
  const { data, loading, error } = useSubscription(GET_SONGS);

  if (loading) {
    return (
      <div className={cx.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>Error occured</div>;
  }

  const { songs } = data;

  return (
    <div>
      {songs.map((song) => (
        <Song key={song.id} songDetails={song} />
      ))}
    </div>
  );
};

export default SongList;
