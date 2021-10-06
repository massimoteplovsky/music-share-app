import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_SONG } from '../graphql/mutations';
import {
  InputAdornment,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles,
} from '@material-ui/core';
import { AddBoxOutlined, Link } from '@material-ui/icons';
import SoundcloudPlayer from 'react-player/lib/players/SoundCloud';
import YoutubePlayer from 'react-player/lib/players/YouTube';
import ReactPlayer from 'react-player';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignitems: 'center',
  },
  urlInput: {
    margin: theme.spacing(1),
  },
  addSongButton: {
    margin: theme.spacing(1),
  },
  dialog: {
    textAlign: 'center',
  },
  thumbnail: {
    width: '90%',
  },
}));

const songInitialProps = {
  title: '',
  artist: '',
  duration: 0,
  thumbnail: '',
};

const AddSong = () => {
  const cx = useStyles();
  const [addSong, { error }] = useMutation(ADD_SONG);
  const [url, setUrl] = useState('');
  const [isPlayable, setIsPlayable] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [songData, setSongData] = useState(songInitialProps);

  const { title, artist, thumbnail } = songData;

  const handleCloseDialog = () => {
    setDialog(false);
  };

  useEffect(() => {
    const isPlayable =
      SoundcloudPlayer.canPlay(url) || YoutubePlayer.canPlay(url);
    setIsPlayable(isPlayable);
  }, [url]);

  const handleChangeSongData = (event) => {
    const { name, value } = event.target;
    setSongData((prevSongData) => ({ ...prevSongData, [name]: value }));
  };

  const handleAddSong = async () => {
    try {
      const { artist, title, thumbnail, url, duration } = songData;
      await addSong({
        variables: {
          artist: artist !== '' ? artist : null,
          title: title !== '' ? title : null,
          thumbnail: thumbnail !== '' ? thumbnail : null,
          url: thumbnail !== '' ? url : null,
          duration: duration > 0 ? duration : null,
        },
      });
      handleCloseDialog();
      setSongData(songInitialProps);
      setUrl('');
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditSong = async ({ player }) => {
    const nestedPlayer = player.player.player;
    let songData;

    if (nestedPlayer.getVideoData) {
      songData = getYoutubeInfo(nestedPlayer);
    }

    if (nestedPlayer.getCurrentSound) {
      songData = await getSoundCloudInfo(nestedPlayer);
    }

    setSongData({ ...songData, url });
  };

  const getYoutubeInfo = (player) => {
    const duration = player.getDuration();
    const { title, video_id, author } = player.getVideoData();
    const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`;

    return {
      title,
      artist: author,
      duration,
      thumbnail,
    };
  };

  const getSoundCloudInfo = (player) => {
    return new Promise((resolve) => {
      player.getCurrentSound((songData) => {
        if (songData) {
          resolve({
            duration: Number(songData.duration / 1000),
            title: songData.title,
            artist: songData.user.username,
            thumbnail: songData.artwork_url.replace('-large', '-t500x500'),
          });
        }
      });
    });
  };

  const handleInputError = (fieldName) => {
    return error?.graphQLErrors[0].extensions.path.includes(fieldName);
  };

  return (
    <div className={cx.container}>
      <Dialog className={cx.dialog} open={dialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <img
            src={thumbnail}
            onError={(e) => {
              e.target.src = '/images/no-image.png';
            }}
            alt="Song thumbnail"
            className={cx.thumbnail}
          />
          <TextField
            name="title"
            label="Title"
            margin="dense"
            fullWidth
            onChange={handleChangeSongData}
            value={title}
            error={handleInputError('title')}
            helperText={handleInputError('title') && 'Enter title'}
          />
          <TextField
            name="artist"
            label="Artist"
            margin="dense"
            fullWidth
            onChange={handleChangeSongData}
            value={artist}
            error={handleInputError('artist')}
            helperText={handleInputError('artist') && 'Enter artist'}
          />
          <TextField
            name="thumbnail"
            label="Thumbnail"
            margin="dense"
            fullWidth
            onChange={handleChangeSongData}
            value={thumbnail}
            error={handleInputError('thumbnail')}
            helperText={handleInputError('thumbnail') && 'Enter thumbnail'}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button variant="outlined" color="primary" onClick={handleAddSong}>
            Add Song
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
        onChange={(e) => setUrl(e.target.value)}
        value={url}
        placeholder="Add YouTube or Soundcloud url"
        fullWidth
        margin="normal"
        type="url"
        className={cx.urlInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Link />
            </InputAdornment>
          ),
        }}
      />
      <Button
        className={cx.addSongButton}
        onClick={() => setDialog(true)}
        variant="contained"
        color="primary"
        endIcon={<AddBoxOutlined />}
        disabled={!isPlayable}
      >
        Add
      </Button>
      <ReactPlayer url={url} hidden onReady={handleEditSong} />
    </div>
  );
};

export default AddSong;
