import { useMutation, useQuery } from '@tanstack/react-query';
import { backendUrl } from '../components/main/utils/url';
import { useContext, useMemo, useState } from 'react';
import RefetchContext from '../context/refetch';
import ThemeContext from '../context/theme';
import { EmptyField, Loader, exp, expL } from '../components';

const ExplorePage = () => {
  let auth = localStorage.getItem('-jwtKey-');
  let { reft } = useContext(RefetchContext);
  let { mode } = useContext(ThemeContext);
  let [key, setkey] = useState(1);

  let Exp: string = useMemo(() => {
    return mode ? expL : exp;
  }, [mode]);

  const { data, isLoading, isSuccess } = useQuery({
    queryFn: async () => {
      const A = await fetch(`${backendUrl}/explore/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${auth}`,
        },
      });
      return A.json();
    },
    queryKey: ['explore', 'getExplore', reft, key],
    enabled: !!backendUrl,
  });

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const A = await fetch(`${backendUrl}/friend/add`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${auth}`,
        },
        body: JSON.stringify({ id }),
      });
      return A.json();
    },
    mutationKey: ['updateExplore'],
    onSuccess() {
      setkey(Math.floor(Math.random() * 1000));
    },
  });

  if (isLoading) return <Loader on={isLoading} />;

  if (isSuccess && data) {
    return (
      <main className={`flex flex-col items-center w-full justify-center`}>
        <h1
          className={`${
            mode ? 'text-white' : 'text-black'
          } font-script text-3xl text-center w-full`}
        >
          Find Friends
        </h1>
        <section className='sm:w-[90%] w-[97%] mx-auto grid grid-cols-1 gap-4'>
          {isSuccess && data && data.explore.length > 0 ? (
            data?.explore.map(
              (
                item: { name: string; profileImg: string; tag: string; _id: string },
                index: number
              ) => {
                return (
                  <div
                    key={index}
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
                        className='w-12 h-12 rounded-full border border-[#c4c4c4] object-cover'
                      />
                      <p className='flex justify-start ml-3 font-script uppercase text-lg font-semibold'>
                        {item.name}
                      </p>
                    </div>
                    <button
                      className={`${
                        mode ? '' : 'border border-[#d4d4d4]'
                      } bg-[hsl(142,26%,48%)] rounded-full px-4 shadow  p-2 flex justify-center`}
                      onClick={() => mutation.mutate(item._id)}
                    >
                      <i
                        className={`${
                          mode ? 'text-white' : 'text-black'
                        } font-semibold text-xl self-center material-icons-outlined`}
                      >
                        person_add
                      </i>
                    </button>
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
