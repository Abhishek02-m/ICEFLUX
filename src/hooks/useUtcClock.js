import { useEffect, useState } from 'react';

// Reimplementation of the original tickClock()/setInterval pairing.
export default function useUtcClock() {
  const [text, setText] = useState('— UTC');

  useEffect(() => {
    function tick() {
      const d = new Date();
      setText(d.toISOString().replace('T', ' · ').substring(0, 19) + ' UTC');
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return text;
}
