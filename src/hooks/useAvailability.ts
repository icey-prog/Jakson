import { useState, useEffect } from 'react';

function checkAvailability(): boolean {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Africa/Ouagadougou',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    weekday: 'short',
  });
  const parts = formatter.formatToParts(now);
  const hour = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10);
  const minute = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
  const weekday = parts.find((p) => p.type === 'weekday')?.value || '';

  const isWeekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(weekday);
  const isSaturday = weekday === 'Sat';

  if (!isWeekday && !isSaturday) return false;

  const totalMinutes = hour * 60 + minute;

  if (isWeekday) {
    return totalMinutes >= 7 * 60 + 30 && totalMinutes < 16 * 60 + 30; // 7h30-16h30
  }
  // Saturday
  return totalMinutes >= 8 * 60 && totalMinutes < 12 * 60; // 8h-12h
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
