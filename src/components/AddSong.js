import React, { useState } from 'react';
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

const AddSong = () => {
  const cx = useStyles();
  const [dialog, setDialog] = useState(false);

  const handleCloseDialog = () => {
    setDialog(false);
  };

  return (
    <div className={cx.container}>
      <Dialog className={cx.dialog} open={dialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <img
            src="/images/song-preview.jpg"
            alt="Song thumbnail"
            className={cx.thumbnail}
          />
          <TextField name="title" label="Title" margin="dense" fullWidth />
          <TextField name="artist" label="Artist" margin="dense" fullWidth />
          <TextField
            name="thumbnail"
            label="Thumbnail"
            margin="dense"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button variant="outlined" color="primary">
            Add Song
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
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
      >
        Add
      </Button>
    </div>
  );
};

export default AddSong;
