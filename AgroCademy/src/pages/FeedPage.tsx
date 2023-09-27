import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { Loader, profileImg, PostTemplate } from '../components';
import ThemeContext from '../context/theme';
import { backendUrl } from '../components/main/utils/url';
import CommentContext from '../context/comment';

const FeedPage = () => {
  let auth = localStorage.getItem('-jwtKey-');
  let { mode } = useContext(ThemeContext);
  let [id, setid] = useState<string>('');
  let { reft } = useContext(CommentContext);

  //fetch all post recommendation for user
  const query = useQuery({
    queryFn: async () => {
      const A = await fetch(`${backendUrl}/function/post/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${auth}`,
        },
      });
      return A.json();
    },
    queryKey: ['post', 'getpost', reft],
    enabled: !!backendUrl,
  });
  //

  if (query.status === 'error') query.refetch({ queryKey: ['post', 'getpost'] });

  if (query.status === 'loading') return <Loader on={query.status === 'loading'} />;

  if (query.status === 'success' && query.data) {
    let sorted = query.data.data;
    return (
      <main className='grid sm:grid-cols-2 grid-cols-1 items-start sm:mt-10 mt-2 w-full mx-auto sm:gap-4'>
        {sorted.map((item: any, index: number) => {
          return (
            <div key={index}>
              <PostTemplate
                img={item.img ? profileImg : ''}
                name={item.name}
                text={item.text}
                date={item.createdAt}
                tag={item.tag}
                userImg={item.userImg}
                likes={item.likes}
                comment={item.comment}
                userId={item.userId}
                id={item._id}
                mode={mode}
                ellipse={id}
                setEllipse={setid}
                query={query}
              />
            </div>
          );
        })}
      </main>
    );
  }
};

export default FeedPage;
