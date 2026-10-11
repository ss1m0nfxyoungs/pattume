import React from "react";
import { Composition } from "remotion";
import { Video } from "./Video";
import { FPS, SONG_SECONDS } from "./config";

export const Root: React.FC = () => (
  <Composition
    id="Psychedelic"
    component={Video}
    durationInFrames={Math.round(SONG_SECONDS * FPS)}
    fps={FPS}
    width={1920}
    height={1080}
  />
);
