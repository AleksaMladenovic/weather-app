export function getLocalTimeFromTZOffset(tzOffsetHours) {
  const now = new Date();
  const tzOffsetMinutes = tzOffsetHours * 60;
  // UTC time in miliseconds
  const utcTime = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const localTime = new Date(utcTime + tzOffsetMinutes * 60 * 1000);
  return localTime;
}
