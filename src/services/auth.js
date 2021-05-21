export const TOKEN_KEY = "@EDescarte-Token";
export const LOGIN_KEY = "@EDescarte-Login";
export const isAuthenticated = () => sessionStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => sessionStorage.getItem(TOKEN_KEY);
export const getLogin = () => sessionStorage.getItem(LOGIN_KEY);
export const login = (token, login) => {
  sessionStorage.clear();  
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(LOGIN_KEY, login);
};
export const logout = () => {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.setItem(LOGIN_KEY, login);
};
