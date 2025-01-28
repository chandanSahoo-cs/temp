// components/Player/VideoPlayer.tsx
'use client';

interface VideoPlayerProps {
  videoId: string;
}

export default function VideoPlayer({ videoId }: VideoPlayerProps) {
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;
  return (
    <div className="w-full h-64 sm:h-80 lg:h-[500px]">
      <iframe
        src={videoUrl}
        className="w-full h-full rounded-lg shadow-lg"
        title="YouTube Video Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
