import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { GET_SONGS } from '../graphql/queries';

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
  const { data, loading, error } = useQuery(GET_SONGS);

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
