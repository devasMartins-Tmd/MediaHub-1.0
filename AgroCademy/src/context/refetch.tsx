import { createContext, ReactNode, useState } from 'react';
import { RefContextType } from '../type/context';

const RefetchContext = createContext<RefContextType>(undefined as any);

export const RefetchProvider = ({ children }: { children: ReactNode }) => {
  let [reft, setreft] = useState<string>('');

  const updateRef = () => setreft(`${Math.random() * 292}`);

  return (
    <RefetchContext.Provider value={{ reft, setreft, updateRef }}>
      {children}
    </RefetchContext.Provider>
  );
};
export default RefetchContext;
