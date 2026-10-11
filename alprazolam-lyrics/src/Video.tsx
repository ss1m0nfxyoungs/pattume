import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { useAudioData } from "@remotion/media-utils";
import { AUDIO_FILE } from "./config";
import { getEnergy } from "./audio";
import { Background } from "./Background";
import { Lyrics } from "./Lyrics";

export const Video: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const src = staticFile(AUDIO_FILE);
  const audioData = useAudioData(src);
  const energy = getEnergy(audioData, frame, fps);

  return (
    <AbsoluteFill>
      <Audio src={src} />
      <Background energy={energy} />
      <Lyrics energy={energy} />
    </AbsoluteFill>
  );
};
