'use client';
import React, { useState, useEffect } from 'react';

// --- INTERNAL DATA (No more external imports!) ---
const initialSongs = [
  {
    id: 'way-maker',
    title: 'Way Maker',
    artist: 'Sinach / Leeland',
    defaultKey: 'E',
    bpm: '68',
    timeSignature: '4/4',
    category: 'Worship',
    chords: '[E]Way Maker, [G#m]Miracle Worker,\n[A]Promise Keeper,\n[B]Light in the darkness\n\n[E]My God, that is who You are',
    singerKeys: [
      { name: 'Sarah', key: 'D' },
      { name: 'John', key: 'E' },
      { name: 'Emma', key: 'F' }
    ]
  },
  {
    id: 'goodness-of-god',
    title: 'Goodness of God',
    artist: 'Bethel Music',
    defaultKey: 'Ab',
    bpm: '63',
    timeSignature: '4/4',
    category: 'Praise',
    chords: '[Ab]I love You Lord,\n[Eb]For Your mercy never fails me\n[Fm]All my days,\n[Db]I\'ve been held in Your tender arms',
    singerKeys: [
      { name: 'Sarah', key: 'G' },
      { name: 'John', key: 'Ab' },
      { name: 'Emma', key: 'Bb' }
    ]
  },
  {
    id: 'hear-our-praises',
    title: 'Hear Our Praises',
    artist: 'Hillsong Worship',
    defaultKey: 'C',
    bpm: '128',
    timeSignature: '4/4',
    category: 'Praise',
    chords: '[Intro]\n[C] [F/C] [C] [F/C]\n\n[Verse 1]\n[C] May our [F/C] homes be filled with [C] dancing [C] [G/B] [Am7]\n         [F] May our streets be [Gsus4] filled with [G] joy\n[C] May in[F/C]justice bow to [C] Jesus [C] [G/B] [Am7]\n       [F] As the people [Gsus4] turn and [G] pray\n\n[Chorus]\n         [C] From the [G/B] mountain\n       [F/A] To the valley\n         [Am7] Hear our [Em7] praises\n        [F] Rise to [Gsus4] You [G]\n         [C] From the [G/B] heavens\n       [F/A] To the nations\n         [Am7] Hear the [Em7] singing\n         [F] Fill the [Gsus4] air\n\n[Instrumental]\n[C] [F/C] [C] [F/C]\n\n[Verse 2]\n[C] May a [F/C] light shine in the [C] darkness [C] [G/B] [Am7]\n         [F] As we walk be[Gsus4]fore the [G] cross\n[C] May Your [F/C] glory fill the [C] whole earth [C] [G/B] [Am7]\n       [F] As the water [Gsus4] o’er the [G] seas\n\n[Chorus]\n         [C] From the [G/B] mountain\n       [F/A] To the valley\n         [Am7] Hear our [Em7] praises\n        [F] Rise to [Gsus4] You [G]\n         [C] From the [G/B] heavens\n       [F/A] To the nations\n         [Am7] Hear the [Em7] singing\n         [F] Fill the [Gsus4] air\n\n[Bridge]\n     [F] Hallelujah [Dm7]\n     [Am7] Hallelujah [Em7]\n     [F] Hallelujah [Dm7]\n     [Gsus4] Hallelujah [G]\n\n[Chorus]\n         [C] From the [G/B] mountain\n       [F/A] To the valley\n         [Am7] Hear our [Em7] praises\n        [F] Rise to [Gsus4] You [G]\n         [C] From the [G/B] heavens\n       [F/A] To the nations\n         [Am7] Hear the [Em7] singing\n         [F] Fill the [Gsus4] air',
    singerKeys: [
      { name: 'Sarah', key: 'Bb' },
      { name: 'John', key: 'C' },
      { name: 'Emma', key: 'D' }
    ]
  },
  {
    id: 'how-great-is-our-god',
    title: 'How Great Is Our God / How Great Thou Art',
    artist: 'Chris Tomlin',
    defaultKey: 'G',
    bpm: '72',
    timeSignature: '4/4',
    category: 'Worship',
    chords: '[G]The splendor of a [C]King\n[G]Clothed in majesty\n[Em]Let all the earth re[D]joice\n[C]All the earth re[G]joice\n\n[G]How great is our [C]God\n[G]Sing with me [D]now\n[Em]How great is our [C]God',
    singerKeys: [
      { name: 'Sarah', key: 'F' },
      { name: 'John', key: 'G' },
      { name: 'Emma', key: 'A' }
    ]
  },
  {
    id: 'worthy-of-it-all',
    title: 'Worthy of It All',
    artist: 'UpperRoom',
    defaultKey: 'C',
    bpm: '64',
    timeSignature: '4/4',
    category: 'Worship',
    chords: '[C]You are worthy of it [F]all\n[C]You are worthy of it [F]all\n[Am]For from You are [G]all things\n[F]And to You are [C]all things',
    singerKeys: [
      { name: 'Sarah', key: 'Bb' },
      { name: 'John', key: 'C, ' },
      { name: 'Emma', key: 'D' }
    ]
  }
];

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
