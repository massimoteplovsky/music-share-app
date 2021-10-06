export const songReducer = (state, { type, payload = null }) => {
  switch (type) {
    case 'PLAY_SONG':
      return { ...state, isPlaying: true };
    case 'STOP_SONG':
      return { ...state, isPlaying: false };
    case 'SET_SONG':
      return { ...state, song: payload };
    default:
      return state;
  }
};
