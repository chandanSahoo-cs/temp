// components/Player/Playlist.tsx
'use client';

interface PlaylistProps {
  playlists: Array<{ id: string; title: string; thumbnail: string }>;
  onSelect: (videoId: string) => void;
}

export default function Playlist({ playlists, onSelect }: PlaylistProps) {
  return (
    <div className="w-full lg:w-1/4 bg-white border-r shadow-lg h-full overflow-y-auto">
      <h2 className="text-lg font-semibold p-4">Playlist</h2>
      <ul>
        {playlists.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100 transition"
            onClick={() => onSelect(item.id)}
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-16 h-16 rounded-lg"
            />
            <span className="font-medium text-gray-800">{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
