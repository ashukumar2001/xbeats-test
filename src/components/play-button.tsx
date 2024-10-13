"use client";
import {
  useCurrentSongIndex,
  useIsPlayerInit,
  useQueue,
} from "@/hooks/atom-hooks";
import {
  getAlbumDetails,
  getPlaylistDetails,
  getSongDetails,
} from "@/lib/music-api-instance";
import { Episode, Song, Type } from "@/types";
// import { useSearchParams } from "next/navigation";
import { HTMLAttributes } from "react";
import { toast } from "sonner";

type PlayButtonProps = HTMLAttributes<HTMLButtonElement> & {
  type: Type;
  token: string;
};
const PlayButton = ({ type, token, children, ...rest }: PlayButtonProps) => {
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  const [initialQueue, setQueue] = useQueue();
  const [, setIsPlayerInit] = useIsPlayerInit();
  const [, setCurrentSongIndex] = useCurrentSongIndex();
  // const sort = (searchParams.get("sort") as Sort) ?? "desc";

  const handlePlay = async () => {
    // Check if the song is already in the queue
    const songIndex = initialQueue.findIndex(
      (song) => token === song.url.split("/").pop()
    );
    if (songIndex !== -1) {
      setCurrentSongIndex(songIndex);
      setIsPlayerInit(true);
      toast.success(`Playing "${initialQueue[songIndex].name}"`);
    } else {
      let queue: (Song | Episode)[] = [];
      switch (type) {
        case "album": {
          const album = await getAlbumDetails(token);
          queue = album.songs ?? [];
          break;
        }
        case "song": {
          const song = await getSongDetails(token);
          queue = song.songs ?? [];
          break;
        }
        case "playlist": {
          const playlist = await getPlaylistDetails(token);
          queue = playlist.songs ?? [];
          break;
        }
        default:
          return [];
      }

      if (queue.length > 0) {
        const structuredQueue = queue.map(
          ({
            artist_map: { artists },
            id,
            name,
            subtitle,
            type,
            url,
            image,
            download_url,
            duration,
          }) => ({
            id,
            name,
            subtitle,
            type,
            url,
            image,
            download_url,
            duration,
            artists,
          })
        );

        setQueue(structuredQueue);
        setCurrentSongIndex(0);
        setIsPlayerInit(true);
        toast.success(
          `${structuredQueue.length} item${
            structuredQueue.length > 1 ? "s" : ""
          } added to queue`,
          {
            description: `Playing "${structuredQueue[0]?.name}"`,
          }
        );
      } else {
        toast.info("No songs found");
      }
    }
  };

  return (
    <button aria-label="play" onClick={handlePlay} {...rest}>
      {children}
    </button>
  );
};
export default PlayButton;
