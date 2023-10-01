import { createContext, ReactNode, useState } from "react";
import { ThemeContextType } from "../type/context";

const ThemeContext = createContext<ThemeContextType>({
  mode: false,
  setmode: Function,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  let [mode, setmode] = useState<boolean>(false);
  return <ThemeContext.Provider value={{ mode, setmode }}>{children}</ThemeContext.Provider>;
};
export default ThemeContext;
