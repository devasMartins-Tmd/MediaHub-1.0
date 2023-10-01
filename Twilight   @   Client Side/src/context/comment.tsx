import { createContext, ReactNode, useState } from 'react';

const CommentContext = createContext(undefined as any);

export const CommentProvider = ({ children }: { children: ReactNode }) => {
  let [commentMod, setCommentMod] = useState<string>('');
  return (
    <CommentContext.Provider value={{ commentMod, setCommentMod }}>
      {children}
    </CommentContext.Provider>
  );
};
export default CommentContext;
