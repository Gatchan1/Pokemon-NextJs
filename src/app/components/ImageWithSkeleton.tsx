"use client";

import { useEffect, useState } from "react";

export default function ImageWithSkeleton({
  src,
  alt,
  title,
}: {
  src: string;
  alt: string;
  title: string;
}) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Check if the image is already loaded (e.g., from browser cache)
    const img = new Image();
    img.src = src;
    if (img.complete) {
      setIsLoaded(true); // Image is already cached and loaded
    }
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="image-container">
      <img
        src={src}
        alt={alt}
        title={title}
        className={`profile-image ${isLoaded? "display" : "no-display"}`}
        onLoad={handleLoad}
      />
      {/* It's not worth it to optimize the pokemon images using the Image component,
        since it's not free of cost when deployed */}
      {!isLoaded && <div className="image-skeleton"></div>}
    </div>
  );
}
