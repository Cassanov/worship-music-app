'use client';
import React, { useState, useEffect, use } from 'react';

// --- SELF-CONTAINED DATA ---
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
    singerKeys: [{ name: 'Sarah', key: 'D' }, { name: 'John', key: 'E' }, { name: 'Emma', key: 'F' }]
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
    singerKeys: [{ name: 'Sarah', key: 'G' }, { name: 'John', key: 'Ab' }, { name: 'Emma', key: 'Bb' }]
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
    singerKeys: [{ name: 'Sarah', key: 'Bb' }, { name: 'John', key: 'C' }, { name: 'Emma', key: 'D' }]
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
    singerKeys: [{ name: 'Sarah', key: 'F' }, { name: 'John', key: 'G' }, { name: 'Emma', key: 'A' }]
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
    singerKeys: [{ name: 'Sarah', key: 'Bb' }, { name: 'John', key: 'C' }, { name: 'Emma', key: 'D' }]
  },
  {
    id: 'praise',
    title: 'Praise',
    artist: 'Elevation Worship',
    defaultKey: 'B',
    bpm: '127',
    timeSignature: '4/4',
    category: 'Praise',
    chords: '[B]I’ll praise in the valley\n[E]I’ll praise on the mountain\n[G#m]I’ll praise when I’m happy\n[F#]I’ll praise when I’m down\n\n[B]I’ll praise in the morning\n[E]I’ll praise in the evening\n[G#m]I’ll praise every moment\n[F#]Until the day I come home',
    singerKeys: [{ name: 'Sarah', key: 'A' }, { name: 'John', key: 'B' }, { name: 'Emma', key: 'C#' }]
  }
];

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function transposeChord(chord: string, semitones: number): string {
  return chord.replace(/[A-G][#b]?/g, (match) => {
    let note = match;
    const flatMap: { [key: string]: string } = {
      'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#', 'Cb': 'B', 'Fb': 'E'
    };
    if (flatMap[note]) note = flatMap[note];
    const index = NOTES.indexOf(note);
    if (index === -1) return match;
    const newIndex = (index + semitones + 12) % 12;
    return NOTES[newIndex];
  });
}

export default function SongPage({ params }: { params: Promise<{ songId: string }> }) {
  const resolvedParams = use(params);
  const [transpose, setTranspose] = useState(0);
  const [fontSize, setFontSize] = useState(20);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const song = initialSongs.find(s => s.id === resolvedParams.songId);

  if (!mounted) return <div className="min-h-screen bg-gray-50 p-8">Loading...</div>;
  if (!song) return <div className="min-h-screen bg-gray-50 p-8">Song not found.</div>;

  const formatChordsAboveLyrics = (text: string, semitones: number) => {
    const lines = text.split('\n');
    let result = '';

    lines.forEach(line => {
      if (line.trim() === '') {
        result += '<div style="margin-bottom: 1.5rem;"></div>';
        return;
      }

      const parts = line.replace(/\[([^\]]+)\]/g, (match, chord) => {
        const transposed = transposeChord(chord, semitones);
        return `__${transposed}__`;
      }).split(/(__[^_]+__)/);

      let lineChords = '';
      let lineLyrics = '';

      parts.forEach(part => {
        if (part.startsWith('__') && part.endsWith('__')) {
          const chord = part.slice(2, -2);
          lineChords += `<span class="chord-highlight">${chord}</span> `;
          lineLyrics += ' ';
        } else {
          lineChords += ' '.repeat(part.length);
          lineLyrics += part;
        }
      });

      result += `<div class="chord-line">${lineChords}</div>`;
      result += `<div class="lyric-line">${lineLyrics}</div>`;
    });

    return result;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <style>{`
        .chord-line { color: #2563eb; font-weight: 800; font-family: 'Courier New', Courier, monospace; height: 1.2em; line-height: 1.2em; white-space: pre; }
        .lyric-line { font-family: 'Inter', sans-serif; margin-bottom: 1.2rem; line-height: 1.4; white-space: pre; }
        .chord-highlight { font-weight: 800; color: #1d4ed8; }
        @media print {
          nav, .no-print, .detail-sidebar, .controls-section { display: none !important; }
          .container { max-width: 100% !important; margin: 0 !important; padding: 0 !important; }
          .detail-container { border: none !important; box-shadow: none !important; display: block !important; }
          .detail-main { border: none !important; padding: 0 !important; }
          body { background: white !important; }
          @page { size: legal; margin: 1in; }
        }
      `}</style>

      <div className="container" style={{maxWidth: '1000px', margin: '0 auto'}}>
        <a href="/" className="text-blue-600 hover:underline mb-6 block" style={{color: '#2563eb', marginBottom: '1.5rem', display: 'block'}}>← Back to Library</a>

        <div className="detail-container" style={{display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', background: 'white', borderRadius: '1rem', border: '1px solid #e5e7eb', overflow: 'hidden'}}>
          <div className="detail-main" style={{padding: '1.5rem'}}>
            <div className="controls-section" style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem'}}>
                <div style={{flex: '1', minWidth: '250px'}}>
                  <h1 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>{song.title}</h1>
                  <p style={{fontSize: '1.1rem', color: '#4b5563'}}>{song.artist}</p>
                </div>
                <div style={{textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '150px'}}>
                  <span style={{fontSize: '0.8rem', color: '#6b7280', textTransform: 'uppercase'}}>Transpose Key</span>
                  <div style={{display: 'flex', gap: '0.5rem', justifyContent: 'flex-end'}}>
                    <button onClick={() => setTranspose(t => t - 1)} style={{padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.25rem', cursor: 'pointer'}}>-</button>
                    <span style={{padding: '0.5rem 1rem', fontFamily: 'monospace', fontWeight: 'bold'}}>{transpose === 0 ? 'Original' : (transpose > 0 ? `+${transpose}` : transpose)}</span>
                    <button onClick={() => setTranspose(t => t + 1)} style={{padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.25rem', cursor: 'pointer'}}>+</button>
                  </div>
                </div>
              </div>

              <div style={{display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem', border: '1px solid #e5e7eb', flexWrap: 'wrap'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginRight: '1rem'}}>
                  <span style={{fontSize: '0.875rem', fontWeight: '500'}}>Font Size: {fontSize}px</span>
                  <button onClick={() => setFontSize(f => Math.max(12, f - 2))} style={{padding: '0.2rem 0.6rem', border: '1px solid #d1d5db', borderRadius: '0.25rem', cursor: 'pointer'}}>-</button>
                  <button onClick={() => setFontSize(f => Math.min(48, f + 2))} style={{padding: '0.2rem 0.6rem', border: '1px solid #d1d5db', borderRadius: '0.25rem', cursor: 'pointer'}}>+</button>
                </div>
                <button onClick={() => window.print()} style={{padding: '0.5rem 1rem', background: '#2563eb', color: 'white', borderRadius: '0.25rem', border: 'none', cursor: 'pointer', fontWeight: 'bold', marginLeft: 'auto'}}>Print PDF</button>
              </div>
            </div>

            <div className="print-header" style={{marginBottom: '2rem'}}>
               <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '1rem', color: '#4b5563', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem'}}>
                 <span><strong style={{color: '#111827'}}>Original Key:</strong> {song.defaultKey}</span>
                 <span><strong style={{color: '#111827'}}>Current Key:</strong> <span style={{color: '#2563eb', fontWeight: 'bold'}}>{transposeChord(song.defaultKey, transpose)}</span></span>
                 <span><strong style={{color: '#111827'}}>BPM:</strong> {song.bpm || 'N/A'}</span>
                 <span><strong style={{color: '#111827'}}>Time:</strong> {song.timeSignature || '4/4'}</span>
                 <span><strong style={{color: '#111827'}}>Category:</strong> {song.category || 'General'}</span>
               </div>
            </div>

            <h3 className="no-print" style={{fontSize: '1.125rem', fontWeight: '600', color: '#9ca3af', marginBottom: '1rem', textTransform: 'uppercase'}}>Lyrics & Chords</h3>
            <div
              className="chord-text"
              style={{ fontSize: `${fontSize}px` }}
              dangerouslySetInnerHTML={{ __html: formatChordsAboveLyrics(song.chords, transpose) }}
            />
          </div>

          <div className="detail-sidebar" style={{padding: '1.5rem', background: '#f3f4f6', borderTop: '1px solid #e5e7eb'}}>
            <h3 style={{fontSize: '1.125rem', fontWeight: '600', color: '#9ca3af', marginBottom: '1rem', textTransform: 'uppercase'}}>Singer Keys</h3>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead style={{textAlign: 'left', color: '#9ca3af', fontSize: '0.875rem'}}>
                <tr style={{textAlign: 'left'}}>
                  <th style={{paddingBottom: '0.5rem', textAlign: 'left'}}>Singer</th>
                  <th style={{paddingBottom: '0.5rem', textAlign: 'right'}}>Key</th>
                </tr>
              </thead>
              <tbody style={{borderTop: '1px solid #e5e7eb'}}>
                {song.singerKeys.map((sk, i) => (
                  <tr key={i} style={{borderBottom: '1px solid #e5e7eb'}}>
                    <td style={{padding: '0.75rem 0', fontWeight: '500'}}>{sk.name}</td>
                    <td style={{padding: '0.75rem 0', textAlign: 'right', fontFamily: 'monospace', fontWeight: 'bold', color: '#2563eb'}}>{sk.key}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
