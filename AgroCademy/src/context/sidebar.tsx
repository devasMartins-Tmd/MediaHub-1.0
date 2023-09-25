import { createContext, ReactNode, useState } from "react";

const ToggleBarContext = createContext(undefined as any);

export const ToggleBarProvider = ({ children }: { children: ReactNode }) => {
  let [flag, setflag] = useState<boolean>(false);
  return (
    <ToggleBarContext.Provider value={{ flag, setflag }}>{children}</ToggleBarContext.Provider>
  );
};
export default ToggleBarContext;
