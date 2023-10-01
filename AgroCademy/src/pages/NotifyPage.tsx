import { useMutation, useQuery } from '@tanstack/react-query';
import { backendUrl } from '../components/main/utils/url';
import { useContext } from 'react';
import RefetchContext from '../context/refetch';
import ThemeContext from '../context/theme';
import { Loader } from '../components';

const NotificationPage = () => {
  let auth = localStorage.getItem('-jwtKey-');
  let { reft, updateRef } = useContext(RefetchContext);
  let { mode } = useContext(ThemeContext);

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const A = await fetch(`${backendUrl}/notification/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${auth}`,
        },
      });
      return A.json();
    },

    queryKey: ['getNotifications', reft],
  });

  const removeMutation = useMutation({
    mutationFn: async (id: string) => {
      const A = await fetch(`${backendUrl}/notification/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${auth}`,
        },
        body: JSON.stringify({ id }),
      });
      return A.json();
    },
    mutationKey: ['removeNotification', reft],

    onSuccess() {
      updateRef();
    },
  });

  if (isLoading) return <Loader on={isLoading} />;

  return (
    <section className='flex flex-col items-center w-full p-3'>
      <header className='w-auto rounded shadow flex justify-center my-2'>
        <h1
          className={`${mode ? 'text-[hsl(0,0%,90%)]' : 'text-[hsl(0,0%,10%)]'} text-open text-xl`}
        >
          Notifications
        </h1>
      </header>
      <section className='grid grid-cols-1 w-full gap-3'>
        {data.list.map((item: any) => {
          let div =
            item.type == 'success' ? (
              <div
                className={`border-green-700 border flex flex-row items-center w-full justify-between p-3 rounded ${
                  mode ? 'bg-[hsl(127,14%,26%)]' : 'bg-green-100'
                }`}
              >
                <div className='flex flex-row items-center'>
                  <i className='font-thin text-xl fa text-green-700 mr-4'>&#xf058;</i>
                  <p
                    className={`${
                      mode ? 'text-[hsl(0,0%,90%)]' : 'text-[hsl(0,0%,20%)]'
                    } font-open text-sm text-left font-semibold`}
                  >
                    {item.text}
                  </p>
                </div>
                <div
                  className='flex justify-center cursor-pointer'
                  onClick={() => removeMutation.mutate(item._id)}
                >
                  <i className='text-xl self-center material-icons-outlined'>close</i>
                </div>
              </div>
            ) : (
              <div
                className={`border-red-700 border flex flex-row items-center w-full justify-between p-3 rounded ${
                  mode ? 'bg-[hsl(0,36%,31%)]' : 'bg-red-100'
                }`}
              >
                <div className='flex flex-row items-center'>
                  <i className='font-thin text-xl fa text-green-700 mr-4'>&#xf058;</i>
                  <p
                    className={`${
                      mode ? 'text-[hsl(0,0%,90%)]' : 'text-[hsl(0,0%,20%)]'
                    } font-open text-sm text-left font-semibold`}
                  >
                    {item.text}
                  </p>
                </div>
                <div
                  className='flex justify-center cursor-pointer'
                  onClick={() => removeMutation.mutate(item._id)}
                >
                  <i className='text-xl self-center material-icons-outlined'>close</i>
                </div>
              </div>
            );
          return div;
        })}
      </section>
    </section>
  );
};

export default NotificationPage;
