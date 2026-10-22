const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function transposeChord(chord: string, semitones: number): string {
  return chord.replace(/[A-G][#b]?/g, (match) => {
    let note = match;
    // Normalize flats to sharps for easier indexing
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
