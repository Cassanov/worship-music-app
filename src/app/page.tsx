'use client';
import React, { useState, useEffect } from 'react';
import { initialSongs } from '../data/songs';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredSongs = initialSongs.filter(song =>
    song.title.toLowerCase().includes(search.toLowerCase()) ||
    song.artist.toLowerCase().includes(search.toLowerCase())
  );

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50 p-8">Loading library...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <nav className="nav-bar">
        <h1 className="text-3xl font-bold text-blue-700">Bible Centered Church 🎵</h1>
        <div className="flex gap-4">
          <a href="/admin" className="btn-admin">Admin</a>
        </div>
      </nav>

      <div className="container">
        <div className="flex justify-between items-center mb-8" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
          <h2 className="text-2xl font-semibold">Song Library</h2>
          <input
            type="text"
            placeholder="Search songs..."
            className="search-input"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="song-grid">
          {filteredSongs.map(song => (
            <a
              key={song.id}
              href={`/songs/${song.id}`}
              className="song-card"
            >
              <h3 className="text-xl font-bold">{song.title}</h3>
              <p className="text-gray-500">{song.artist}</p>
              <div className="mt-4 text-blue-600 font-mono font-bold" style={{marginTop: '1rem', color: '#2563eb', fontWeight: 'bold', fontFamily: 'monospace'}}>Key: {song.defaultKey}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
