import { createContext } from 'react';

/* Authcontext is is an object we can share between compontnts and when we update it, any component that
listens to it will get updated */
export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {},
});
