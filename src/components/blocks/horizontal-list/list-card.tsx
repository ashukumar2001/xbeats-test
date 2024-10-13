import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ImageWithFallback from "@/components/image-with-fallback";
import {
  cn,
  getHref,
  getImageSource,
  trimStringAddEllipsis,
} from "@/lib/utils";
import { Quality, Type } from "@/types";
import { Play } from "lucide-react";
import Link from "next/link";
import React from "react";
import PlayButton from "@/components/play-button";

export type ListCardProps = {
  name: string;
  type: Type;
  url: string;
  image: Quality;
  explicit?: boolean;
  subtitle?: string;
  className?: string;
  aspect?: "square" | "video";
  hidePlayButton?: boolean;
  isCurrentSeason?: boolean;
};
const ListCard = ({
  name,
  image,
  // explicit,
  subtitle,
  // className,
  aspect,
  // hidePlayButton,
  // isCurrentSeason,
  url,
  type,
}: ListCardProps) => {
  const imageSrc = getImageSource(image, "high");
  const toUrl = getHref(url, type);
  return (
    <Card
      className={cn(
        "rounded-md bg-transparent hover:bg-card border-none cursor-pointer transition-all duration-150 group",
        aspect === "video"
          ? "w-44 sm:w-48 md:w-64 lg:w-72"
          : "w-32 sm:w-36 md:w-48"
      )}
    >
      <CardContent className="px-0 space-y-3 p-3">
        <div
          className={cn(
            "relative w-full rounded-md overflow-hidden",
            aspect === "video" ? "aspect-video" : "aspect-square",
            ["radio_station", "artist"].includes(type) && "rounded-full border"
          )}
        >
          <Link href={toUrl} className="absolute inset-0 z-10">
            <span className="sr-only">see {name}</span>
          </Link>
          <ImageWithFallback
            src={imageSrc}
            width={180}
            height={180}
            alt={name}
            type={type}
            className={cn("size-full object-cover rounded-md")}
          />
          <div className="absolute bottom-2 right-2 hidden group-hover:grid place-items-center z-20">
            <PlayButton
              type={type}
              token={toUrl.split("/").pop()!}
              className={cn(
                buttonVariants({
                  variant: "secondary",
                  size: "icon",
                }),
                "rounded-full bg-secondary/90 hover:bg-secondary/90 w-12 h-12 active:scale-90 transition-all active:bg-secondary shadow"
              )}
            >
              <Play size={28} className="fill-primary p-1" />
            </PlayButton>
          </div>
        </div>
        <p className="text-sm font-semibold">
          <Link href={toUrl}>{trimStringAddEllipsis(name)}</Link>
        </p>

        <p className="text-xs font-semibold truncate text-muted-foreground capitalize">
          {type === "artist" ? "Artist" : subtitle}
        </p>
      </CardContent>
    </Card>
  );
};

export default ListCard;
