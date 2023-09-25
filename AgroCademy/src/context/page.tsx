import { ReactNode, createContext, useState } from 'react';
import { PageContextType } from '../type/context';
import { FeedPage, ExplorePage, FriendPage } from '../components';

const PageContext = createContext<PageContextType>(undefined as any);

export const PageProvider = ({ children }: { children: ReactNode }) => {
  let pagesObject: { [key: string]: ReactNode } = {
    '0x1': <FeedPage />,
    '0x2': <ExplorePage />,
    '0x3': <FriendPage />,
    '0x4': '',
    '0x5': '',
    '0x6': '',
    '0x7': '',
    '0x8': '',
  };
  let [page, setpage] = useState<ReactNode>(pagesObject['0x1']);

  const setPage = (id: string) => {
    setpage(pagesObject[id]);
  };
  return <PageContext.Provider value={{ page, setPage }}>{children}</PageContext.Provider>;
};

export default PageContext;
