import React from 'react';
import { Typography, useMediaQuery } from '@material-ui/core';

// Components
import QueuedSong from './QueuedSong';

const QueuedSongList = () => {
  const md = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return (
    md && (
      <div style={{ margin: '10px 0' }}>
        <Typography color="textSecondary" variant="button">
          QUEUE (5)
        </Typography>
        <QueuedSong
          artist="Metallica"
          title="One"
          thumbnail="https://i.pinimg.com/236x/ef/53/43/ef5343540e4be864d90a33e9e17cc314--james-hetfield-my-favorite-music.jpg?nii=t"
        />
        <QueuedSong
          artist="Metallica"
          title="One"
          thumbnail="https://i.pinimg.com/236x/ef/53/43/ef5343540e4be864d90a33e9e17cc314--james-hetfield-my-favorite-music.jpg?nii=t"
        />
        <QueuedSong
          artist="Metallica"
          title="One"
          thumbnail="https://i.pinimg.com/236x/ef/53/43/ef5343540e4be864d90a33e9e17cc314--james-hetfield-my-favorite-music.jpg?nii=t"
        />
        <QueuedSong
          artist="Metallica"
          title="One"
          thumbnail="https://i.pinimg.com/236x/ef/53/43/ef5343540e4be864d90a33e9e17cc314--james-hetfield-my-favorite-music.jpg?nii=t"
        />
        <QueuedSong
          artist="Metallica"
          title="One"
          thumbnail="https://i.pinimg.com/236x/ef/53/43/ef5343540e4be864d90a33e9e17cc314--james-hetfield-my-favorite-music.jpg?nii=t"
        />
      </div>
    )
  );
};

export default QueuedSongList;
