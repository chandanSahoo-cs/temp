'use client';
import ModeToggle from '@/components/ModeToggle';
import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { fetchPlaylistItems } from '../../lib/youtube';
import { useRouter } from 'next/navigation';
import { Play } from 'lucide-react'; // Using lucide-react for the play icon

export default function Home() {
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (session?.accessToken) {
      const loadPlaylists = async () => {
        try {
          const response = await fetchPlaylistItems(
            session.accessToken,
            'PLRAV69dS1uWTvNby0b1w_boT35Onv5YWS',
          );
          console.log('API Response:', response);
          setPlaylists(response.items);
        } catch (error) {
          console.error('Error loading playlists:', error);
        }
      };
      loadPlaylists();
    }
  }, [session]);

  const handleNavigate = (videoId: string, playlist: any) => {
    localStorage.setItem(
      'currentPlaylist',
      JSON.stringify({
        videos: playlists,
        currentVideoId: videoId,
        currentIndex: playlists.findIndex(
          (item) => item.snippet.resourceId.videoId === videoId,
        ),
      }),
    );
    router.push(`/player?videoId=${videoId}`);
  };

  return (
    <div className="w-full min-h-screen p-8">
      <ModeToggle></ModeToggle>
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        My YouTube Playlists
      </h1>
      {!session ? (
        <div className="flex justify-center">
          <button
            onClick={() => signIn('google')}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Sign in with Google
          </button>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-end mb-6">
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-500 text-white font-medium rounded-md shadow-md hover:bg-red-600 transition"
            >
              Sign Out
            </button>
          </div>
          {playlists.length === 0 ? (
            <p className="text-center text-lg text-gray-600">
              Loading playlists...
            </p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {playlists.map((playlist) => (
                <li
                  key={playlist.id}
                  className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition group relative"
                >
                  <div className="relative">
                    <img
                      className="w-full h-40 object-cover rounded-lg mb-3"
                      src={
                        playlist.snippet.thumbnails?.medium?.url ||
                        playlist.snippet.thumbnails?.default?.url ||
                        '/placeholder.png'
                      }
                      alt={playlist.snippet.title}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                      <button
                        onClick={() =>
                          handleNavigate(
                            playlist.snippet.resourceId.videoId,
                            playlist,
                          )
                        }
                        className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-blue-700"
                      >
                        <Play size={16} />
                        Watch Now
                      </button>
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">
                    {playlist.snippet.title}
                  </h2>
                  <div className="mt-3 flex justify-between items-center">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {playlist.snippet.description ||
                        'No description available'}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
