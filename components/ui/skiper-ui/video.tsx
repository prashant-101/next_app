"use client";

import React from "react";

interface VideoBackgroundProps {
  src: string;
  className?: string;
}

export default function VideoBackground({
  src,
  className = "",
}: VideoBackgroundProps) {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      className={className}
    >
      <source src={`/${src}`} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}