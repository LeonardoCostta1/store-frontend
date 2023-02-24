import React from 'react';

import Player from './Player';

export default {
  title: 'Player',
  component: Player,
  excludeStories: /.*Data$/,
};

export const TitleMusicData = {
    sound: 'extreme climate - forest fire, wildfire',
    artist:'unrealsfx'
  };
  
export const player = () => <Player {...TitleMusicData} />;