'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const Player = () => {
  const [playlistData, setPlaylistData] = useState<{
    videos: any[];
    currentVideoId: string;
    currentIndex: number;
  } | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const videoId = searchParams.get('videoId');

  useEffect(() => {
    const storedPlaylist = localStorage.getItem('currentPlaylist');
    if (storedPlaylist) {
      setPlaylistData(JSON.parse(storedPlaylist));
    }
  }, []);

  const handleNextVideo = () => {
    if (
      playlistData &&
      playlistData.currentIndex < playlistData.videos.length - 1
    ) {
      const nextIndex = playlistData.currentIndex + 1;
      const nextVideo = playlistData.videos[nextIndex];
      const nextVideoId = nextVideo.snippet.resourceId.videoId;

      localStorage.setItem(
        'currentPlaylist',
        JSON.stringify({
          ...playlistData,
          currentVideoId: nextVideoId,
          currentIndex: nextIndex,
        }),
      );

      router.push(`/player?videoId=${nextVideoId}`);
    }
  };

  const handlePreviousVideo = () => {
    if (playlistData && playlistData.currentIndex > 0) {
      const prevIndex = playlistData.currentIndex - 1;
      const prevVideo = playlistData.videos[prevIndex];
      const prevVideoId = prevVideo.snippet.resourceId.videoId;

      // Update localStorage with new current video
      localStorage.setItem(
        'currentPlaylist',
        JSON.stringify({
          ...playlistData,
          currentVideoId: prevVideoId,
          currentIndex: prevIndex,
        }),
      );

      router.push(`/player?videoId=${prevVideoId}`);
    }
  };

  if (!playlistData) {
    return <div>Loading...</div>;
  }

  const currentVideo = playlistData.videos[playlistData.currentIndex];

  return (
    <div className="max-w-6xl mx-auto p-3">
      <div className="mb-2">
        <h1 className="text-2xl font-bold mb-4">
          {currentVideo.snippet.title}
        </h1>

        {/* Video player iframe would go here */}
        <div className="aspect-video bg-black mb-4">
          {/* Add your YouTube iframe here */}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePreviousVideo}
            disabled={playlistData.currentIndex === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
          >
            Previous
          </button>
          <button
            onClick={handleNextVideo}
            disabled={
              playlistData.currentIndex === playlistData.videos.length - 1
            }
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Playlist Videos</h2>
        <div className="space-y-4">
          {playlistData.videos.map((video, index) => (
            <div
              key={video.id}
              className={`p-4 rounded cursor-pointer ${
                index === playlistData.currentIndex
                  ? 'bg-blue-100'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => {
                const videoId = video.snippet.resourceId.videoId;
                localStorage.setItem(
                  'currentPlaylist',
                  JSON.stringify({
                    ...playlistData,
                    currentVideoId: videoId,
                    currentIndex: index,
                  }),
                );
                router.push(`/player?videoId=${videoId}`);
              }}
            >
              <div className="flex items-center">
                <img
                  width={96}
                  height={54}
                  src={
                    video.snippet.thumbnails?.default?.url || '/placeholder.png'
                  }
                  alt={video.snippet.title}
                  className="w-24 h-16 object-cover rounded mr-4"
                />
                <div>
                  <h3 className="font-medium">{video.snippet.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Player;
