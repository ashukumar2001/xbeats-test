"use client";
import { cn } from "@/lib/utils";
import { Type } from "@/types";
import type { ImageProps } from "next/image";
import Image from "next/image";
import { SyntheticEvent, useEffect, useState } from "react";

type ImageWithFallbackProps = ImageProps & {
  fallback?: ImageProps["src"];
  type: Type;
};
const ImageWithFallback = ({
  type,
  fallback = `/images/placeholder/${type}.jpg`,
  alt,
  src,
  className,
  ...rest
}: ImageWithFallbackProps) => {
  const [error, setError] = useState<SyntheticEvent<
    HTMLImageElement,
    Event
  > | null>(null);

  useEffect(() => {
    setError(null);
  }, [src]);
  return (
    <Image
      src={error ? fallback : src}
      alt={alt}
      onError={setError}
      className={cn(className)}
      {...rest}
    />
  );
};

export default ImageWithFallback;
