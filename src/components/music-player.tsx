import { useRef, forwardRef, useImperativeHandle, useState, useEffect } from 'react';

export type MusicPlayerHandle = { toggle: () => void };

const MusicPlayer = forwardRef<MusicPlayerHandle>((_, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    audio.play()
      .then(() => setPlaying(true))
      .catch((err) => {
        console.log('Autoplay blocked by browser', err);
      });
  }, []);

  useImperativeHandle(ref, () => ({
    toggle: () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (!playing) {
        audio.play().catch(() => {});
        setPlaying(true);
      } else {
        audio.pause();
        setPlaying(false);
      }
    }
  }));

  return (
    <audio
      ref={audioRef}
      src={`${import.meta.env.BASE_URL}I've got my eye on you.mp3`}
      loop
      playsInline
    />
  );
});

export default MusicPlayer;
