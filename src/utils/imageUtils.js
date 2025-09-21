import { useState, useEffect } from "react";

// Image optimization utilities
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadImages = async (imageSources) => {
  try {
    await Promise.all(imageSources.map(preloadImage));
    return true;
  } catch (error) {
    console.warn("Some images failed to preload:", error);
    return false;
  }
};

// Lazy loading utility
export const useLazyImage = (src, placeholder = "") => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
    img.src = src;
  }, [src]);

  return { imageSrc, isLoaded };
};
