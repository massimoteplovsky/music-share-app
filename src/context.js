import { createContext } from 'react';

export const SongContext = createContext({
  song: {
    id: '0705584b-dbed-4b56-bda3-3616eca79605',
    title: 'Life Goes On',
    artist: 'Oliver Tree',
    duration: 161,
    url:
      'https://soundcloud.com/olivertree/life-goes-on?si=9f666418f22340b2bab865dd5f3d18b1',
    thumbnail:
      'https://i1.sndcdn.com/artworks-ygMTPsJ00lEzVy2W-XH0BOg-t500x500.jpg',
  },
  isPlaying: false,
});
