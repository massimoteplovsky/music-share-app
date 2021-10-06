import React, { useContext, useReducer } from 'react';
import { SongContext } from './context';
import Header from './components/Header';
import AddSong from './components/AddSong';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';
import { Grid, useMediaQuery } from '@material-ui/core';
import { songReducer } from './reducer';

const App = () => {
  const initialState = useContext(SongContext);
  const [state, dispatch] = useReducer(songReducer, initialState);
  const md = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return (
    <SongContext.Provider value={{ state, dispatch }}>
      <Header />
      <Grid container spacing={3}>
        <Grid
          style={{
            paddingTop: 86,
          }}
          item
          xs={12}
          md={7}
        >
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          style={
            md
              ? { position: 'fixed', width: '100%', right: 0, top: 70 }
              : { position: 'fixed', width: '100%', left: 0, bottom: 0 }
          }
          item
          xs={12}
          md={5}
        >
          <SongPlayer />
        </Grid>
      </Grid>
    </SongContext.Provider>
  );
};

export default App;
