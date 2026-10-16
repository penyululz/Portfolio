import type { Theme } from "../site.config";

export interface VideoEnv {
  width: number;
  reducedMotion: boolean;
  saveData: boolean;
}

/** The hero video is several megabytes: only load it on wide screens that allow motion and data. */
export function shouldPlayVideo(env: VideoEnv): boolean {
  return env.width >= 1024 && !env.reducedMotion && !env.saveData;
}

export function heroVideoSrc(theme: Theme): string {
  return `/video/hero-${theme}.mp4`;
}
