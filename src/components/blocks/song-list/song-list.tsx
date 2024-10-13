import { Button, buttonVariants } from "@/components/ui/button";
import ImageWithFallback from "@/components/image-with-fallback";
import { cn, getHref, getImageSource } from "@/lib/utils";
import { Episode, Song } from "@/types";
import { Heart, MoreVertical, Play } from "lucide-react";
import Link from "next/link";
import PlayButton from "@/components/play-button";

type SongListProps = {
  items: (Song | Episode)[];
  showAlbum?: boolean;
  className?: string;
};

const SongList = ({ items, showAlbum = true }: SongListProps) => {
  return (
    <section>
      <ol className="text-muted-foreground space-y-2">
        {items.map((item, idx) => (
          <li key={item.id}>
            <div className="group h-14 cursor-pointer rounded-md grid grid-cols-12 items-center gap-4 hover:bg-secondary transition-all">
              <div className="hidden lg:flex lg:justify-center col-span-1">
                <span
                  className={cn(
                    "font-medium text-sm",
                    !showAlbum && "group-hover:hidden"
                  )}
                >
                  {idx + 1}
                </span>
                {!showAlbum && (
                  <PlayButton
                    type={item.type}
                    token={item.url.split("/").pop()!}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "hidden group-hover:flex"
                    )}
                  >
                    <Play strokeWidth={9} className="w-5 p-1" />
                  </PlayButton>
                )}
              </div>
              <figure
                className={cn(
                  "col-span-9 flex gap-4 items-center",
                  showAlbum && "xl:col-span-7"
                )}
              >
                {showAlbum && (
                  <div className="relative aspect-square h-10 shrink-0 m-w-fit overflow-hidden rounded">
                    <ImageWithFallback
                      alt={item.name}
                      src={getImageSource(item.image, "high")}
                      type={item.type}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <figcaption
                  className={cn(showAlbum ? "w-[calc(100%-56px)]" : "w-full")}
                >
                  <h4 className="w-full truncate text-sm text-primary">
                    <Link
                      className="hover:underline"
                      href={getHref(item.url, item.type)}
                    >
                      {item.name}
                    </Link>
                  </h4>
                  <p className="text-sm truncate">
                    {item.artist_map.artists.map((artist, artistIdx, arr) => (
                      <span key={artist.id}>
                        <Link
                          href={getHref(artist.url, artist.type)}
                          className="hover:underline hover:text-primary"
                        >
                          {artist.name}
                        </Link>
                        {artistIdx < arr.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                </figcaption>
              </figure>
              {showAlbum && item.type !== "episode" && (
                <p className="col-span-2 truncate hidden xl:block text-sm">
                  <Link
                    href={getHref(item.album_url, item.type)}
                    className="hover:underline hover:text-primary"
                  >
                    {item.album}
                  </Link>
                </p>
              )}

              {item.type === "episode" && (
                <p className="hidden xl:block text-sm col-span-2">
                  {new Date(item.release_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              )}

              <div className="col-span-3 lg:col-span-2 flex justify-end gap-3 items-center">
                <p className="text-sm">22:30</p>
                <div className="flex">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hidden lg:flex"
                  >
                    <Heart className="hover:text-primary" size={20} />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreVertical className="hover:text-primary" size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default SongList;
