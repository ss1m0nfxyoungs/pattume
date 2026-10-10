import React from 'react';
import {Composition} from 'remotion';
import {MinecraftStory} from './MinecraftStory';
import {FPS, HEIGHT, TOTAL_FRAMES, WIDTH} from './data';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MinecraftStory"
      component={MinecraftStory}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
