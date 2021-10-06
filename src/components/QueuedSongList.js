import React from 'react';
import { Typography, useMediaQuery } from '@material-ui/core';

// Components
import QueuedSong from './QueuedSong';

const QueuedSongList = ({ queue }) => {
  const md = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return (
    md && (
      <div style={{ margin: '10px 0' }}>
        {queue.length > 0 && (
          <Typography color="textSecondary" variant="button">
            QUEUE ({queue.length})
          </Typography>
        )}
        {queue.map((song) => (
          <QueuedSong key={song.id} songDetails={song} />
        ))}
      </div>
    )
  );
};

export default QueuedSongList;
