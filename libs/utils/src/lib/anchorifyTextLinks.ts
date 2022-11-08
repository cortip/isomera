/**
 * Scans the text and converts links into html anchors
 * @param text {string} text to be checked
 */
export const anchorifyTextLinks = (text: string) => {
  const regex =
    /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/gim;
  const anchorify = (match: string) => {
    return `<a href="${match}" target="_blank">${match}</a>`;
  };
  return text.replace(regex, anchorify);
};
