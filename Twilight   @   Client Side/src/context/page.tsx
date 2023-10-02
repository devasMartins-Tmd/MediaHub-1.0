import { ReactNode, createContext, useState } from 'react';
import { PageContextType } from '../type/context';
import { FeedPage, ExplorePage, FriendPage, NotificationPage, SettingPage } from '../components';

const PageContext = createContext<PageContextType>(undefined as any);

export const PageProvider = ({ children }: { children: ReactNode }) => {
   let pagesObject: { [key: string]: ReactNode } = {
      '0x1': <FeedPage />,
      '0x2': <ExplorePage />,
      '0x3': <FriendPage />,
      '0x4': <NotificationPage />,
      '0x5': <SettingPage />,
   };
   let [page, setpage] = useState<ReactNode>(pagesObject['0x1']);
   let [key, setkey] = useState('');

   const setPage = (id: string) => {
      setpage(pagesObject[id]);
      setkey(id);
   };
   return <PageContext.Provider value={{ page, setPage, key }}>{children}</PageContext.Provider>;
};

export default PageContext;
