export const uppercase = (str: string) => {
  if (str.length == 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const fetchIdFromUrl = (stringToSearch: string, url: string) => {
  return url.slice(
    url.lastIndexOf(stringToSearch) + stringToSearch.length,
    url.length - 1,
  );
};
