/**
 * Plays an audio file from public directory.
 * @param filePath {string}
 */
export const playSound = (filePath: string) => {
  const audio = new Audio(filePath);
  void audio.play();
};
