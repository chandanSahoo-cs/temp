// pages/player.tsx
'use client';

import { useState } from 'react';
import MainLayout from './layout';
import VideoPlayer from './_component/videoPlayer';
import Playlist from './_component/playlist';
import NotesEditor from './_component/noteWithPlayer';

const dummyPlaylists = [
  {
    id: 'video1',
    title: 'Video 1 Title',
    thumbnail: 'https://via.placeholder.com/150',
  },
  {
    id: 'video2',
    title: 'Video 2 Title',
    thumbnail: 'https://via.placeholder.com/150',
  },
];

export default function PlayerPage() {
  const [currentVideo, setCurrentVideo] = useState<string>(
    dummyPlaylists[0].id,
  );

  const handleVideoSelect = (videoId: string) => {
    setCurrentVideo(videoId);
  };

  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row gap-4 p-6">
        <div className="lg:w-3/4">
          <VideoPlayer videoId={currentVideo} />
          <div className="mt-6">
            <NotesEditor />
          </div>
        </div>
        <Playlist playlists={dummyPlaylists} onSelect={handleVideoSelect} />
      </div>
    </MainLayout>
  );
}
