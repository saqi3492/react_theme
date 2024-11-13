export const getLocalStorageItem = (key, defaultValue = null) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
  } catch (e) {
    console.log(e);
    return defaultValue;
  }
};

export const handleLogout = () => {
  localStorage.clear();
  window.location.reload();
};
