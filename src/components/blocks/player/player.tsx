"use client";
import ImageWithFallback from "@/components/image-with-fallback";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  useCurrentSongIndex,
  useIsPlayerInit,
  useQueue,
} from "@/hooks/atom-hooks";
import { cn, getDownloadLink, getHref, getImageSource } from "@/lib/utils";
import {
  Loader2,
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { toast } from "sonner";
import PlayerSlider from "./player-slider";
const Player = () => {
  const [queue] = useQueue();
  const [currentSongIndex, setCurrentSongIndex] = useCurrentSongIndex();
  const [isPlayerInit, setIsPlayerInit] = useIsPlayerInit();
  const currentSong = queue[currentSongIndex] ?? null;
  const {
    load,
    playing,
    togglePlayPause,
    // getPosition,
    isLoading,
    loop,
    looping,
    // mute,
    // muted,
    // volume,
    // setVolume,
    isReady,
  } = useGlobalAudioPlayer();
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoopPlaylist, setIsLoopPlaylist] = useState(false);

  const loopingRef = useRef(looping);
  const isLoopPlaylistRef = useRef(isLoopPlaylist);
  const isShuffleRef = useRef(isShuffle);
  const playPauseHandler = useCallback(() => {
    if (isPlayerInit) {
      togglePlayPause();
    } else {
      setIsPlayerInit(true);
    }
  }, [isPlayerInit, togglePlayPause, setIsPlayerInit]);

  const handleNext = () => {
    // Initialize the player
    if (!isPlayerInit) setIsPlayerInit(true);
    let _index = currentSongIndex;
    // set _index to random number in case of shuffle
    if (isShuffle) {
      _index = Math.floor(Math.random() * queue.length);
    } else {
      // play next song if not at the end
      if (currentSongIndex < queue.length - 1) {
        _index = currentSongIndex + 1;
        // play first song after end of playing is isLoopPlaylist is true
      } else if (isLoopPlaylist) _index = 0;
    }
    setCurrentSongIndex(_index);
  };

  const handlePrev = () => {
    if (!isPlayerInit) setIsPlayerInit(true);
    let _index = currentSongIndex;
    // set _index to random number in case of shuffle
    if (isShuffle) {
      _index = Math.floor(Math.random() * queue.length);
    } else {
      // play previous song if not at the start
      if (currentSongIndex > 0) {
        _index = currentSongIndex - 1;
        // play last song if isLoopPlaylist is true
      } else if (isLoopPlaylist) _index = queue.length - 1;
    }
    setCurrentSongIndex(_index);
  };

  const handleOnEnd = () => {
    let _index = currentSongIndex;
    // set _index to random number in case of shuffle
    if (isShuffleRef.current) {
      _index = Math.floor(Math.random() * queue.length);
    } else {
      if (currentSongIndex < queue.length - 1) {
        // set _index to next song if not at the end and looping is false
        if (!loopingRef.current) _index = currentSongIndex + 1;
        // set _index to first song after end of playing is isLoopPlaylist is true
      } else {
        if (isLoopPlaylistRef.current) _index = 0;
      }
    }
    setCurrentSongIndex(_index);
  };

  /**
   * Handles the loop/repeat functionality of the player
   */
  const loopHandler = () => {
    if (isReady) {
      // If the queue has only one song, toggle the loop on/off
      if (queue.length === 1) {
        loop(!looping);
        toast.success(
          looping ? "Repeat is disabled" : "Playing current song on repeat"
        );
      } else {
        // If the queue has more than one song, toggle the loop playlist on/off
        if (!looping && !isLoopPlaylist) {
          setIsLoopPlaylist(true);
          loop(false);
          toast.success("Playing current playlist on repeat");
        } else if (!looping && isLoopPlaylist) {
          setIsLoopPlaylist(false);
          loop(true); // If the loop playlist is on, set the loop to true
          toast.success("Playing current song on repeat");
        } else if (looping) {
          loop(false); // If the loop is on, set it to false
        }
      }
    }
  };

  useEffect(() => {
    if (queue.length > 0 && isPlayerInit) {
      const audioSource = getDownloadLink(
        queue[currentSongIndex].download_url,
        "high"
      );
      load(audioSource, {
        html5: true,
        autoplay: true,
        initialMute: false,
        onend: handleOnEnd,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue, currentSongIndex, isPlayerInit]);

  useEffect(() => {
    loopingRef.current = looping;
    isLoopPlaylistRef.current = isLoopPlaylist;
    isShuffleRef.current = isShuffle;
  }, [looping, isLoopPlaylist, isShuffle]);

  return (
    <section
      className={cn(
        "h-0",
        !!currentSong && "h-[72px] p-3 pt-0 grid grid-cols-7 gap-3 items-center"
      )}
    >
      {!!currentSong && (
        <>
          <div className="col-span-2 flex gap-3 items-center">
            <div className="relative aspect-square w-12 h-12 shrink-0 overflow-hidden rounded-md">
              <ImageWithFallback
                src={getImageSource(currentSong.image, "low")}
                fill
                alt={currentSong.name}
                type="song"
              />
            </div>
            <div className="w-[calc(100%-48px)]">
              <Link
                href={getHref(
                  currentSong.url,
                  currentSong.type === "song" ? "song" : "episode"
                )}
                className="text-sm line-clamp-1 hover:underline"
              >
                {currentSong.name}
              </Link>
              <p className="text-xs text-muted-foreground">
                {currentSong.subtitle}
              </p>
            </div>
          </div>
          <div className="col-span-3 flex flex-col-reverse justify-between gap-y-2">
            <PlayerSlider currentSong={currentSong} />
            <div className="flex items-center justify-center gap-8">
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <button
                    aria-label={
                      isShuffle ? "Disable Shuffle" : "Enable Shuffle"
                    }
                    onClick={() => setIsShuffle((prev) => !prev)}
                    className={cn(!isShuffle && "text-muted-foreground")}
                  >
                    <Shuffle size={16} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {isShuffle ? "Disable shuffle" : "Enable shuffle"}
                </TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <button aria-label="Previous" onClick={handlePrev}>
                    <SkipBack
                      size={20}
                      className="dark:fill-white fill-black"
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Previous</TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <button
                    aria-label={playing ? "Pause" : "Play"}
                    onClick={playPauseHandler}
                    className="active:scale-90 transition-transform duration-100"
                  >
                    {isLoading ? (
                      <Loader2 size={28} className="animate-spin" />
                    ) : playing ? (
                      <Pause size={28} className="dark:fill-white fill-black" />
                    ) : (
                      <Play size={28} className="dark:fill-white fill-black" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>{playing ? "Pause" : "Play"}</TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <button aria-label="Next" onClick={handleNext}>
                    <SkipForward
                      size={20}
                      className="dark:fill-white fill-black"
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Next</TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <button
                    aria-label={
                      looping
                        ? "Disable repeat"
                        : isLoopPlaylist
                        ? "Repeat current song"
                        : "Repeat playlist"
                    }
                    onClick={loopHandler}
                    className={cn(
                      !looping && !isLoopPlaylist && "text-muted-foreground"
                    )}
                  >
                    {looping ? <Repeat1 size={16} /> : <Repeat size={16} />}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {looping
                    ? "Disable repeat"
                    : isLoopPlaylist
                    ? "Repeat current song"
                    : "Repeat playlist"}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Player;
