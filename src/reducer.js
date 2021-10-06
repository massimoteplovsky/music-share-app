export const songReducer = (state, { type, payload = null }) => {
  switch (type) {
    case 'TOGGLE_PLAY_SONG':
      return { ...state, isPlaying: !state.isPlaying };
    case 'SET_SONG':
      return { ...state, song: payload };
    default:
      return state;
  }
};
