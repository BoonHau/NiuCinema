/**
 *
 * @param {string} url the web url
 */
export const isValidURL = (url: string) => {
  const pattern = new RegExp(
    '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?',
  );
  return !!pattern.test(url);
};
