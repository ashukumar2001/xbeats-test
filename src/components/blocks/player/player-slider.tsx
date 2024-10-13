import {
  Slider,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from "@/components/ui/slider";
import { formatDuration } from "@/lib/utils";
import { QueueItem } from "@/types";
import { useEffect, useRef, useState } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";

const PlayerSlider = ({ currentSong }: { currentSong: QueueItem }) => {
  const [pos, setPos] = useState(0);
  const { duration, seek, getPosition } = useGlobalAudioPlayer();
  const frameRef = useRef<number>();
  useEffect(() => {
    const animate = () => {
      setPos(getPosition());
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [getPosition]);
  return (
    <div className="flex gap-2 items-center">
      <span className="text-xs text-muted-foreground w-12">
        {formatDuration(pos, pos > 3600 ? "hh:mm:ss" : "mm:ss")}
      </span>
      <Slider
        value={[pos]}
        max={duration}
        onValueChange={([values]) => {
          seek(values);
          setPos(values);
        }}
      >
        <SliderTrack className="h-1 cursor-pointer">
          <SliderRange />
        </SliderTrack>
        <SliderThumb className="size-3 cursor-pointer lg:block" />
      </Slider>
      <span className="text-xs text-muted-foreground w-12">
        {formatDuration(
          currentSong.duration,
          currentSong.duration > 3600 ? "hh:mm:ss" : "mm:ss"
        )}
      </span>
    </div>
  );
};
export default PlayerSlider;
