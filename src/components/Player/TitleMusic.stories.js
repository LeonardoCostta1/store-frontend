import React from 'react';

import TitleMusic from './TitleMusic';

export default {
  title: 'TitleMusic',
  component: TitleMusic,
  excludeStories: /.*Data$/,
};

export const TitleMusicData = {
    sound: 'extreme climate - forest fire, wildfire',
    artist:'unrealsfx',
    duration:"0:10 / 0:40"
  };
  
export const titleMusic = () => <TitleMusic {...TitleMusicData} />;