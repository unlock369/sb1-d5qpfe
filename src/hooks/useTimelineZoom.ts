import { useState } from 'react';

const MIN_SCALE = 1;
const MAX_SCALE = 3;
const SCALE_STEP = 0.5;

export function useTimelineZoom(initialScale = 1) {
  const [scale, setScale] = useState(initialScale);

  const zoomIn = () => {
    setScale((current) => Math.min(current + SCALE_STEP, MAX_SCALE));
  };

  const zoomOut = () => {
    setScale((current) => Math.max(current - SCALE_STEP, MIN_SCALE));
  };

  return {
    scale,
    zoomIn,
    zoomOut
  };
}