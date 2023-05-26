const isAuthenticated = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  return (token !== null && token !== undefined) || sessionStorage.getItem('token') !== null;
};

export default isAuthenticated;