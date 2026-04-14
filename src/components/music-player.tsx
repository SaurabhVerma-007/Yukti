import { useEffect, useRef, useState } from 'react';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(true);

  const startMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.5;
    audio.load();
    audio.play().then(() => {
      setPlaying(true);
      setVisible(false);
    }).catch(() => {});
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}song.mp3`} loop playsInline />

      {/* First-time prompt — disappears after tap */}
      {visible && (
        <div
          onClick={startMusic}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 cursor-pointer"
        >
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 text-sm text-white/80 animate-pulse">
            🎵 Tap to play music
          </div>
        </div>
      )}

      {/* Persistent toggle button after music starts */}
      {!visible && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/20 transition-colors"
        >
          {playing ? '🔇' : '🎵'}
        </button>
      )}
    </>
  );
}