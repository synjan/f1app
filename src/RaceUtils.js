// RaceUtils.js
export const simplifyCountdown = (days, hours, minutes) => {
    const parts = [];
    if (days > 0) parts.push(`${days} day${days > 1 ? 's' : ''}`);
    if (hours > 0) parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
    if (minutes > 0) parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
    return parts.join(', '); // Changed 'and' to ',' for a more standard list format
  };
  
  export const calculateCountdown = (sessionDateTime) => {
    const now = new Date();
    const sessionDate = new Date(sessionDateTime);
    const timeDifference = sessionDate - now;
  
    if (timeDifference <= 0) {
      return 'Already started';
    }
  
    let seconds = Math.floor(timeDifference / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
  
    hours %= 24;
    minutes %= 60;
    seconds %= 60;
  
    return simplifyCountdown(days, hours, minutes);
  };
  
  export const formatSession = (session, timeZone = 'UTC') => {
    if (!session || !session.date || !session.time) return 'Not scheduled';
    const sessionDateTime = new Date(`${session.date}T${session.time}`);
    if (isNaN(sessionDateTime.getTime())) return 'Not scheduled';
    return sessionDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZoneName: 'short', timeZone });
  };
  