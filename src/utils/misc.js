
export const isLoggedIn = (user) => {
  return true;
};

export const parseTimezoneName = (code, format = 'display') => {
  try {
    if (format === 'list') {
      let c = code;
      c = code.replace(new RegExp('/', 'g'), ' - ');
      c = code.replace(new RegExp('_', 'g'), ' ');
      return c;
    }

    if (format === 'display') {
      const parts = code.split('/');
      let str = parts[parts.length - 1];
      str = str.replace(new RegExp('_', 'g'), ' ');
      return str;
    }
  } catch (e) {
    return code;
  }
};

export const findPercentLocation = (start, end, value) => {
  const perc = (value - start) / (end - start);
  return perc * 100;
};
