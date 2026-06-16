import { useRef, forwardRef, useImperativeHandle, useState, useEffect, useCallback } from 'react';

export type MusicPlayerHandle = { 
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => void;
};

const MusicPlayer = forwardRef<MusicPlayerHandle>((_, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const hasStartedRef = useRef(false);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || hasStartedRef.current) return;
    
    hasStartedRef.current = true;
    
    try {
      await audio.play();
      setPlaying(true);
    } catch (err) {
      hasStartedRef.current = false;
      console.log('Playback blocked:', err);
    }
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.pause();
    setPlaying(false);
    hasStartedRef.current = false;
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  }, [playing]);

  // Try autoplay on mount (usually blocked)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.5;
    
    audio.play()
      .then(() => setPlaying(true))
      .catch(() => {});
  }, []);

  useImperativeHandle(ref, () => ({ play, pause, toggle }));

  return (
    <audio
      ref={audioRef}
      src={`${import.meta.env.BASE_URL}I've got my eye on you.mp3`}
      loop
      playsInline
      preload="auto"
    />
  );
});

export default MusicPlayer;
