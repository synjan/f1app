export const formatDateTimeNordic = (dateString, timeString) => {
    const date = new Date(`${dateString}T${timeString}`);
    return new Intl.DateTimeFormat('no-NO', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'UTC'
    }).format(date);
  };