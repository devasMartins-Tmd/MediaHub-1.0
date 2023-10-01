import { useMutation, useQuery } from '@tanstack/react-query';
import { backendUrl } from '../components/main/utils/url';
import { useContext, useMemo } from 'react';
import RefetchContext from '../context/refetch';
import ThemeContext from '../context/theme';
import { EmptyField, Loader, exp, expL } from '../components';

const ExplorePage = () => {
  let auth = localStorage.getItem('-jwtKey-');
  let { reft, updateRef } = useContext(RefetchContext);
  let { mode } = useContext(ThemeContext);

  let Exp: string = useMemo(() => {
    return mode ? expL : exp;
  }, [mode]);

  const { data, isLoading, isSuccess } = useQuery({
    queryFn: async () => {
      const A = await fetch(`${backendUrl}/friend/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${auth}`,
        },
      });
      return A.json();
    },
    queryKey: ['explore', 'getExplore', reft],
    enabled: !!backendUrl,
  });

  const unFriendMutation = useMutation({
    mutationFn: async (id: string) => {
      const A = await fetch(`${backendUrl}/friend/remove`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${auth}`,
        },
        body: JSON.stringify({ unFriendId: id }),
      });
      return A.json();
    },
    mutationKey: ['deleteFriend', 'unFriend'],
    onSuccess() {
      updateRef();
    },
  });

  if (isLoading) return <Loader on={isLoading} />;

  if (isSuccess && data) {
    return (
      <main className={`flex flex-col items-center w-full justify-center`}>
        <h1
          className={`${
            mode ? 'text-white bg-[hsl(0,0%,18%)]' : 'text-black bg-[hsl(0,0%,98%)]'
          } font-open text-xl text-center w-auto shadow p-2 rounded my-2 font-thin`}
        >
          Your Friends
        </h1>
        <section className='sm:w-[90%] w-[97%] mx-auto grid grid-cols-1 gap-4'>
          {isSuccess && data && data.friends.length > 0 ? (
            data?.friends.map(
              (
                item: { frndName: string; profileImg: string; tag: string; frndId: string },
                index: number
              ) => {
                return (
                  <div
                    key={index}
                    data-user={item.frndId}
                    className={`flex flex-row items-center w-full p-3 justify-between border ${
                      mode
                        ? 'bg-[hsl(0,0%,10%)] border-[hsl(0,0%,20%)] text-white'
                        : 'bg-white border border-[#c4c4c4]'
                    } rounded-lg`}
                  >
                    <div className='flex flex-row items-center'>
                      <img
                        src={item.profileImg || Exp}
                        alt='explore user image'
                        className='w-10 h-10 rounded-full border border-[#c4c4c4] object-cover'
                      />
                      <p className='flex justify-start ml-3 font-open capitalize text-base font-semibold'>
                        {item.frndName}
                      </p>
                    </div>
                    <div className='flex flex-row items-center w-auto'>
                      <button
                        className={`${
                          mode ? 'bg-[hsl(0,0%,30%)]' : 'bg-[hsl(0,0%,20%)]'
                        } rounded-lg px-8 flex justify-center`}
                      >
                        <i
                          className={`${
                            mode ? 'text-white' : 'text-white'
                          } font-thin text-xl self-center material-icons-outlined`}
                        >
                          check_circle
                        </i>
                      </button>
                      <button
                        className={`${
                          mode ? 'bg-[hsl(0,0%,30%)]' : 'bg-[hsl(0,0%,20%)]'
                        } rounded-lg px-5 flex justify-center ml-3 py-1`}
                        onClick={() => unFriendMutation.mutate(item.frndId)}
                      >
                        <p
                          className={`${
                            mode ? 'text-white' : 'text-white'
                          } font-normal text-sm self-center`}
                        >
                          unfollow
                        </p>
                      </button>
                    </div>
                  </div>
                );
              }
            )
          ) : (
            <EmptyField text='Friend List' size='w-1/2' />
          )}
        </section>
      </main>
    );
  }
};

export default ExplorePage;
