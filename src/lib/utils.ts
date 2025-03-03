/**
 * Format a duration in seconds into a string of the form "X:YY", where X is
 * the number of minutes and YY is the number of seconds, always displayed with
 * two digits.
 *
 * @param durationInSeconds - The duration in seconds to format.
 * @returns A string of the form "X:YY" representing the duration.
 */
export function formatDuration(durationInSeconds: number) {
  if (isNaN(durationInSeconds) || durationInSeconds < 0) {
    return "0:00";
  }

  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = Math.floor(durationInSeconds % 60);

  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${minutes}:${formattedSeconds}`;
}
