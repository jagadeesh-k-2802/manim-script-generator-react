import React, { useState } from 'react';
import { cn } from "@/lib/utils"

interface VideoDisplayProps {
  videoUrl: string | null;
  className?: string;
}

export const VideoDisplay: React.FC<VideoDisplayProps> = ({ videoUrl, className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (!videoUrl) return null;

  const handleVideoLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setError('Failed to load video. Please try again.');
  };

  return (
    <div className={cn("w-full rounded-lg border border-white/10 bg-black/20 mb-8", className)}>
      <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-white/10">
        <span className="text-sm text-gray-300">Rendered Animation</span>
      </div>
      <div className="p-4 bg-black/20 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-white">Loading video...</div>
          </div>
        )}
        {error && (
          <div className="text-red-500 text-sm mb-2">{error}</div>
        )}
        <video 
          controls 
          className="w-full rounded-lg"
          src={videoUrl}
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          preload="auto"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};
