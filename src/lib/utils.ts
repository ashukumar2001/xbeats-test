import { ImageQuality, Quality, StreamQuality, Type } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageSource = (imageData: Quality, quality: ImageQuality) => {
  if (typeof imageData === "string") return imageData;
  else if (quality === "low") return imageData[0].link;
  else if (quality === "medium") return imageData[1].link;
  else return imageData[2]?.link;
};
export const trimStringAddEllipsis = (
  str: string,
  maxLength: number = 38,
  ellipses = true
) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + (ellipses ? "..." : "");
  } else {
    return str;
  }
};

export function getHref(url: string, type: Type) {
  // const re = /https:\/\/www.jiosaavn.com\/(s\/)?\w*/;
  // return `/${url.replace(re, type)}`;
  const regex = /\/([^/]+)\/([^/]+)$/;
  const match = url.match(regex);

  if (match) {
    // Decode URL-encoded characters for better readability
    const name = decodeURIComponent(match[1]);
    const token = match[2];
    return `/${type}/${name}/${token}`;
  }
  return "";
}

export function formatDuration(seconds: number, format: "hh:mm:ss" | "mm:ss") {
  const date = new Date(seconds * 1000);

  return format === "hh:mm:ss"
    ? date.toISOString().slice(11, 19)
    : date.toISOString().slice(14, 19);
}

export function getDownloadLink(url: Quality, quality: StreamQuality) {
  if (typeof url === "string") {
    return url;
  }
  switch (quality) {
    case "poor":
      return url[0].link;
    case "low":
      return url[1].link;
    case "medium":
      return url[2].link;
    case "high":
      return url[3].link;
    default:
      return url[4].link;
  }
}
