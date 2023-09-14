export const getLocalStorage = (keyName, defaultValue) => {
    try {
        const value = window.localStorage.getItem(keyName);
        if (value) {
          return JSON.parse(value);
        } else {
          window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
          return defaultValue;
        }
    } catch (err) {
        return defaultValue;
    }
};
export const setLocalStorage = (keyName, value) => {
  try {
       window.localStorage.setItem(keyName, JSON.stringify(value));
  } catch (err) {
     
  }
};

export const removeLocalStorage = (keyName) => {
  window.localStorage.removeItem(keyName);
};



