export function getDate(value, options = {}) {
  return new Intl.DateTimeFormat('fa-IR', {
    ...(options ? options : { month: 'long', day: 'numeric', weekday: 'long' }),
  }).format(value)
}

export function getNextDate(timestamp = 0, options = {}) {
  return new Intl.DateTimeFormat('fa-IR', {
    ...(options ? options : { month: 'long', day: 'numeric', weekday: 'long' }),
  }).format(new Date().getTime() + timestamp)
}
