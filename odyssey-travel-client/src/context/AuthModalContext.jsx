import { createContext, useContext, useState } from "react";

export const AuthModalContext = createContext();

export function AuthModalProvider({ children }) {
  const [loginOpen, setLoginOpen] = useState(false);

  const openLogin = () => setLoginOpen(true);
  const closeLogin = () => setLoginOpen(false);

  return (
    <AuthModalContext.Provider value={{ loginOpen, openLogin, closeLogin }}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  return useContext(AuthModalContext);
}
