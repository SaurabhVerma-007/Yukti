import { useRef, forwardRef, useImperativeHandle, useState } from 'react';

export type MusicPlayerHandle = { toggle: () => void };

const MusicPlayer = forwardRef<MusicPlayerHandle>((_, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useImperativeHandle(ref, () => ({
    toggle: () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (!playing) {
        audio.volume = 0.5;
        audio.load();
        audio.play().catch(() => {});
        setPlaying(true);
      } else {
        audio.pause();
        setPlaying(false);
      }
    }
  }));

  return <audio ref={audioRef} src={`${import.meta.env.BASE_URL}song.mp3`} loop playsInline />;
});

export default MusicPlayer;