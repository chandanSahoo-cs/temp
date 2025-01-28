// components/Player/NotesEditor.tsx
'use client';

import { useState } from 'react';

export default function NotesEditor() {
  const [notes, setNotes] = useState<string>('');

  const handleBold = () => {
    setNotes((prev) => prev + '**bold** ');
  };

  const handleItalic = () => {
    setNotes((prev) => prev + '_italic_ ');
  };

  return (
    <div className="w-full bg-gray-100 p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-3">Notes</h3>
      <div className="flex gap-2 mb-3">
        <button
          onClick={handleBold}
          className="px-3 py-1 bg-blue-600 text-white rounded-md"
        >
          Bold
        </button>
        <button
          onClick={handleItalic}
          className="px-3 py-1 bg-blue-600 text-white rounded-md"
        >
          Italic
        </button>
      </div>
      <textarea
        className="w-full h-32 p-2 border rounded-lg resize-none"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your notes here..."
      />
    </div>
  );
}
