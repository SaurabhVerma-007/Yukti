import { useRef, forwardRef, useImperativeHandle, useState, useEffect, useCallback } from 'react';

export type MusicPlayerHandle = { 
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => void;
};

const MusicPlayer = forwardRef<MusicPlayerHandle>((_, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const attemptRef = useRef(0);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || playing) return;
    
    attemptRef.current += 1;
    
    try {
      await audio.play();
      setPlaying(true);
    } catch (err) {
      // If blocked, don't mark as started so it can retry on next interaction
      attemptRef.current -= 1;
      console.log('Playback blocked, waiting for user gesture...');
    }
  }, [playing]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.pause();
    setPlaying(false);
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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.5;
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
