import { useState, useEffect } from 'react';

function checkAvailability(): boolean {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Paris',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    weekday: 'short',
  });
  const parts = formatter.formatToParts(now);
  const hour = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10);
  const minute = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
  const weekday = parts.find((p) => p.type === 'weekday')?.value || '';

  const dayNum = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].indexOf(weekday);

  // Monday to Friday only
  if (dayNum === -1) return false;

  const totalMinutes = hour * 60 + minute;
  const startMinutes = 8 * 60 + 30; // 8:30
  const endMinutes = 18 * 60 + 30;  // 18:30

  return totalMinutes >= startMinutes && totalMinutes < endMinutes;
}

export function useAvailability() {
  const [isAvailable, setIsAvailable] = useState(checkAvailability);

  useEffect(() => {
    // Check immediately
    setIsAvailable(checkAvailability());

    // Check every 60 seconds
    const interval = setInterval(() => {
      setIsAvailable(checkAvailability());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return isAvailable;
}
