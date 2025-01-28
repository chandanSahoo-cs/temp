'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import MainLayout from './layout';
import VideoPlayer from './_component/videoPlayer';
import Playlist from './_component/playlist';
import NotesEditor from './_component/noteWithPlayer';
import { fetchPlaylistItems } from '../../lib/youtube';

export default function PlayerPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [videoId, setVideoId] = useState<string | null>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    const currentVideoId = searchParams.get('videoId');
    setVideoId(currentVideoId);

    // Only fetch if we have a session
    if (session?.accessToken) {
      const loadPlaylists = async () => {
        setIsLoading(true);
        try {
          const response = await fetchPlaylistItems(
            session.accessToken,
            'PLRAV69dS1uWTvNby0b1w_boT35Onv5YWS',
          );
          setPlaylists(response.items);
        } catch (error) {
          console.error('Error fetching playlists:', error);
        } finally {
          setIsLoading(false);
        }
      };

      loadPlaylists();
    }
  }, [searchParams, session]);

  const handleVideoSelect = (videoId: string) => {
    setVideoId(videoId);
    router.push(`/player?videoId=${videoId}`);
  };

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Show sign-in prompt if not authenticated
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold">
          Please sign in to view this content
        </h1>
        <button
          onClick={() => signIn('google')}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 min-h-screen">
      <div className="lg:w-3/4">
        {videoId ? <VideoPlayer videoId={videoId} /> : <p>No video selected</p>}
        <div className="mt-6">
          <NotesEditor />
        </div>
      </div>
      <div className="lg:w-1/4">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <p>Loading playlist...</p>
          </div>
        ) : (
          <Playlist playlists={playlists} onSelect={handleVideoSelect} />
        )}
      </div>
    </div>
  );
}
