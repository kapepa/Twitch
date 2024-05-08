"use client"

import { useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client"
import { FC, useEffect, useRef, useState } from "react"
import { FullscreenControl } from "./fullscreen-control";
import { useEventListener } from "usehooks-ts";
import { VolumeControl } from "./volume-control";

interface LiveVideoProps {
  participant: Participant,
}

const LiveVideo: FC<LiveVideoProps> = (props) => {
  const { participant } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [volume, setVolume] = useState<number>(0);
  const [isFullscreeen, setIsFullscreen] = useState<boolean>(false);

  const onVolumeChange = (sound: number) => {
    setVolume(+sound);

    if (videoRef.current) {
      videoRef.current.muted = sound === 0;
      videoRef.current.volume = +sound * 0.01;
    }
  }

  const toggleMute = () => {
    const isMuted = volume === 0;
    setVolume(isMuted ? 50 : 0)

    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  }

  // useEffect(() => {
  //   onVolumeChange(0);
  // })

  const toggleFullscreen = () => {
    if (isFullscreeen) {
      document.exitFullscreen();
      setIsFullscreen(false)
    } else if (wrapperRef.current) {
      wrapperRef.current.requestFullscreen();
      setIsFullscreen(true)
    }
  }

  const handleFullscreenChange = () => {
    const isCurrentlyFullscreen = document.fullscreenElement !== null;
    setIsFullscreen(isCurrentlyFullscreen);
  }

  useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);

  useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  ).forEach((track) => {
    if (videoRef.current) track.publication?.track?.attach(videoRef.current)
  });

  return (
    <div
      ref={wrapperRef}
      className="relative h-full flex"
    >
      <video
        ref={videoRef}
        width="100%"
      />
      <div
        className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all"
      >
        <div
          className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-t from-slate-900 px-4"
        >
          <VolumeControl
            value={volume}
            onToggle={toggleMute}
            onChange={onVolumeChange}
          />
          <FullscreenControl  
            isFullscreen={isFullscreeen}
            onToggle={toggleFullscreen}
          />
        </div>
      </div>
    </div>
  )
}

export { LiveVideo };