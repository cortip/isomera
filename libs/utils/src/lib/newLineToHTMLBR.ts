/**
 * Converts newline symbols into HTML <br /> so text from input
 * could be represented in HTML same way.
 * @param text {string}
 */
export const newLineToHTMLBR = (text: string): string => {
  return text.replace(/\n/g, '<br />');
};
