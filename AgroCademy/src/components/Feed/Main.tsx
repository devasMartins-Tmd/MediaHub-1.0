import { exp, expL } from '..';
import { useMutation } from '@tanstack/react-query';
import { backendUrl } from '../main/utils/url';
import { useContext, useMemo } from 'react';
import RefetchContext from '../../context/refetch';
import { uiTime } from '../main/utils/function';

interface MainINT {
  name: string;
  date: string;
  tag: string;
  userImg: string;
  userId: string;
  setEllipse: Function;
  ellipse: string;
  query: { refetch: Function };
  mode: boolean;
  id: string;
}
export const Main = ({
  userImg,
  userId,
  mode,
  date,
  tag,
  name,
  id,
  setEllipse,
  query,
  ellipse,
}: MainINT) => {
  let auth = localStorage.getItem('-jwtKey-');
  let { updateRef } = useContext(RefetchContext);

  let Exp: string = useMemo(() => {
    return mode ? expL : exp;
  }, [mode]);

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const A = await fetch(`${backendUrl}/function/post/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${auth}`,
        },
      });

      return A.json();
    },
    mutationKey: ['delete', 'post', 'deletepost'],

    onSuccess: () => {
      query.refetch({ queryKey: ['getpost'] });
      updateRef(`${Math.random() * 292}`);
    },

    onMutate() {
      query.refetch({ queryKey: ['getpost'] });
    },
  });

  return (
    <div className={`flex flex-row items-center justify-between w-full relative mb-2`}>
      <div className='flex flex-row items-center w-full justify-start'>
        <div className={'w-auto h-auto mr-2 self-center'}>
          <img
            src={userImg ?? Exp}
            className='object-cover w-12 h-12 rounded-full border border-[#62929E]'
            alt='profileImg'
          />
        </div>

        <div className='flex flex-col items-start place-self-start self-center'>
          <div className='flex flex-row items-center'>
            <p
              className={`${
                mode ? 'text-slate-100' : 'text-[#191919]'
              } font-fira text-base font-semibold`}
            >
              {name}
            </p>
            <p
              className={`font-fira text-xs font-normal ml-3 ${
                mode ? 'text-slate-100' : 'text-[#191919]'
              } font-semibold `}
            >
              {uiTime(new Date(date))}
            </p>
          </div>

          <small
            className={`${
              mode ? 'text-slate-100' : 'text-[#191919]'
            } font-fira text-sm text-opacity-50 font-semibold`}
          >
            {tag}
          </small>
        </div>
      </div>
      <div
        className={`${mode ? 'bg-[#202020]' : 'bg-[#ffffff]'} ${
          ellipse === id ? 'grid' : 'hidden'
        } grid-cols-1 rounded-lg sm:h-[100px] h-[80px]
          rounded-tr-none shadow-lg p-3 absolute right-2 top-7 w-[65%]`}
      >
        <div
          className='flex flex-row items-center cursor-pointer'
          data-user={userId}
          data-post={id}
        >
          <i
            className={`${mode ? 'text-white' : 'text-black'} material-icons-outlined
             text-3l`}
          >
            block
          </i>
          <p
            className={`${mode ? 'text-white' : 'text-black'} text-open text-base font-medium ml-3`}
          >
            Unfollow {'someone'}
          </p>
        </div>
        <div
          className='flex flex-row items-center my-5 cursor-pointer'
          data-user={userId}
          data-post={id}
          onClick={() => mutation.mutate(id)}
        >
          <i
            className={`${mode ? 'text-white' : 'text-black'}
             material-icons-outlined text-3xl`}
          >
            delete_forever
          </i>
          <p
            className={`${mode ? 'text-white' : 'text-black'} text-open text-base font-medium ml-3`}
          >
            Delete
          </p>
        </div>
      </div>
      <div
        className='flex justify-end text-center self-start w-[10%] mr-0 cursor-pointer'
        onClick={() => {
          if (ellipse === id) setEllipse('');
          else setEllipse(id);
        }}
      >
        <i
          className={`material-icons-outlined text-2xl text-center ${
            mode ? 'text-white' : 'text-black'
          }`}
        >
          more_vert
        </i>
      </div>
    </div>
  );
};
