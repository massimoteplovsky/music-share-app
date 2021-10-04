import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { PlayArrow, Save } from '@material-ui/icons';

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
  const { title, artist, thumbnail } = songDetails;

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
            <IconButton size="small" color="primary">
              <PlayArrow />
            </IconButton>
            <IconButton size="small" color="secondary">
              <Save />
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  );
};

export default Song;
