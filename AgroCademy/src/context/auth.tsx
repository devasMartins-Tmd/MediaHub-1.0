import { createContext, useState } from "react";
import { authContextType, authStateType } from "../type/context";
import { SignUpAuth } from "../components/index";

const AuthContext = createContext<authContextType>(undefined as any);

export const AuthContextProvider = ({ children }: { children: JSX.Element }) => {
  let [authPage, setAuthPage] = useState<authStateType>({
    currentPage: <SignUpAuth />,
  });
  return <AuthContext.Provider value={{ authPage, setAuthPage }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
