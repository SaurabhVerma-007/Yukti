import { useEffect, useRef } from 'react';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.5;

    const start = () => {
      if (started.current) return;
      started.current = true;
      audio.play().catch(() => {});
    };

    // ❌ Removed 'scroll' — browsers don't treat it as a trusted gesture
    window.addEventListener('click', start, { once: true });
    window.addEventListener('keydown', start, { once: true });
    window.addEventListener('touchstart', start, { once: true });

    return () => {
      window.removeEventListener('click', start);
      window.removeEventListener('keydown', start);
      window.removeEventListener('touchstart', start);
    };
  }, []);

  return <audio ref={audioRef} src={`${import.meta.env.BASE_URL}song.mp3`} loop />;
}