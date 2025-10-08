export const handleLogout = (): void => {
  localStorage.clear();
  window.location.reload();
};
