'use client';
import React, { useState, useEffect, use } from 'react';
import { initialSongs } from '@/data/songs';
import { transposeChord } from '@/lib/transpose';

export default function SongPage({ params }: { params: Promise<{ songId: string }> }) {
  const resolvedParams = use(params);
  const [transpose, setTranspose] = useState(0);
  const [fontSize, setFontSize] = useState(20);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const song = initialSongs.find(s => s.id === resolvedParams.songId);

  if (!mounted) return <div className="min-h-screen bg-gray-50 p-8">Loading...</div>;
  if (!song) return <div className="min-h-screen bg-gray-50 p-8">Song not found. (ID: {resolvedParams.songId})</div>;

  const formatChordsAboveLyrics = (text: string, semitones: number) => {
    const lines = text.split('\n');
    let result = '';

    lines.forEach(line => {
      if (line.trim() === '') {
        result += '<div style="margin-bottom: 0.5rem;"></div>';
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

      result += `<div style="margin-bottom: 0.2rem;">${lineChords}</div>`;
      result += `<div style="margin-bottom: 1.5rem;">${lineLyrics}</div>`;
    });

    return result;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <style>{`
        @media print {
          nav, .no-print, .detail-sidebar, .controls-section { display: none !important; }
          .container { max-width: 100% !important; margin: 0 !important; padding: 0 !important; }
          .detail-container { border: none !important; box-shadow: none !important; display: block !important; }
          .detail-main { border: none !important; padding: 0 !important; }
          body { background: white !important; }
          @page { size: legal; margin: 1in; }
        }
      `}</style>

      <div className="container">
        <a href="/" className="text-blue-600 hover:underline mb-6 block" style={{color: '#2563eb', marginBottom: '1.5rem', display: 'block'}}>← Back to Library</a>

        <div className="detail-container">
          <div className="detail-main">
            <div className="controls-section" style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem'}}>
                <div>
                  <h1 className="text-4xl font-bold" style={{fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>{song.title}</h1>
                  <p className="text-xl text-gray-600" style={{fontSize: '1.25rem', color: '#4b5563'}}>{song.artist}</p>
                </div>
                <div style={{textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider" style={{fontSize: '0.875rem', color: '#6b7280', textTransform: 'uppercase'}}>Transpose Key</span>
                  <div style={{display: 'flex', gap: '0.5rem'}}>
                    <button onClick={() => setTranspose(t => t - 1)} style={{padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.25rem', cursor: 'pointer'}}>-</button>
                    <span style={{padding: '0.5rem 1rem', fontFamily: 'monospace', fontWeight: 'bold'}}>{transpose === 0 ? 'Original' : (transpose > 0 ? `+${transpose}` : transpose)}</span>
                    <button onClick={() => setTranspose(t => t + 1)} style={{padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.25rem', cursor: 'pointer'}}>+</button>
                  </div>
                </div>
              </div>

              <div style={{display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem', border: '1px solid #e5e7eb'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginRight: '1rem'}}>
                  <span style={{fontSize: '0.875rem', fontWeight: '500'}}>Font Size: {fontSize}px</span>
                  <button onClick={() => setFontSize(f => Math.max(12, f - 2))} style={{padding: '0.2rem 0.6rem', border: '1px solid #d1d5db', borderRadius: '0.25rem', cursor: 'pointer'}}>-</button>
                  <button onClick={() => setFontSize(f => Math.min(48, f + 2))} style={{padding: '0.2rem 0.6rem', border: '1px solid #d1d5db', borderRadius: '0.25rem', cursor: 'pointer'}}>+</button>
                </div>
                <button onClick={() => window.print()} style={{padding: '0.5rem 1rem', background: '#2563eb', color: 'white', borderRadius: '0.25rem', border: 'none', cursor: 'pointer', fontWeight: 'bold', marginLeft: 'auto'}}>Print PDF</button>
              </div>
            </div>

            <div className="print-header" style={{marginBottom: '2rem'}}>
               <div style={{display: 'flex', gap: '2rem', fontSize: '1.1rem', color: '#4b5563', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem'}}>
                 <span><strong style={{color: '#111827'}}>Original Key:</strong> {song.defaultKey}</span>
                 <span><strong style={{color: '#111827'}}>Current Key:</strong> <span style={{color: '#2563eb', fontWeight: 'bold'}}>{transposeChord(song.defaultKey, transpose)}</span></span>
                 <span><strong style={{color: '#111827'}}>BPM:</strong> {song.bpm || 'N/A'}</span>
                 <span><strong style={{color: '#111827'}}>Time:</strong> {song.timeSignature || '4/4'}</span>
                 <span><strong style={{color: '#111827'}}>Category:</strong> {song.category || 'General'}</span>
               </div>
            </div>

            <h3 className="text-lg font-semibold mb-4 text-gray-400 uppercase" style={{fontSize: '1.125rem', fontWeight: '600', color: '#9ca3af', marginBottom: '1rem', textTransform: 'uppercase'}}>Lyrics & Chords</h3>
            <div
              className="chord-text"
              style={{ fontSize: `${fontSize}px` }}
              dangerouslySetInnerHTML={{ __html: formatChordsAboveLyrics(song.chords, transpose) }}
            />
          </div>

          <div className="detail-sidebar">
            <h3 className="text-lg font-semibold mb-4 text-gray-400 uppercase" style={{fontSize: '1.125rem', fontWeight: '600', color: '#9ca3af', marginBottom: '1rem', textTransform: 'uppercase'}}>Singer Keys</h3>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr style={{textAlign: 'left', color: '#9ca3af', fontSize: '0.875rem'}}>
                  <th style={{paddingBottom: '0.5rem'}}>Singer</th>
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
