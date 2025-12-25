import { useEffect, useRef, useState, useCallback } from "react";

export interface UseListenVideo {
  videoRef: React.RefObject<HTMLVideoElement>;
  time: number;
  duration: number;
  playing: boolean;
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
}

const useListenVideo = (): UseListenVideo => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);

  const play = useCallback(() => {
    videoRef.current?.play();
  }, []);

  const pause = useCallback(() => {
    videoRef.current?.pause();
  }, []);

  const seek = useCallback((t: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = t;
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => setTime(video.currentTime);
    const onLoadedMetadata = () => setDuration(video.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  return {
    videoRef,
    time,
    duration,
    playing,
    play,
    pause,
    seek,
  };
}
export default useListenVideo
