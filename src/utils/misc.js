
export const isLoggedIn = user => {
  return true;
};

export const parseTimezoneName = (code, format = 'display') => {
  try {

    if (format === 'list') {
      code = code.replace(new RegExp('/', 'g'), ' - ');
      code = code.replace(new RegExp('_', 'g'), ' ');
      return code;
    }

    if (format === 'display') {
      let parts = code.split('/');
      let str = parts[parts.length - 1];
      str = str.replace(new RegExp('_', 'g'), ' ');
      return str;
    }

  }
  catch (e) {
    return code;
  }

};
