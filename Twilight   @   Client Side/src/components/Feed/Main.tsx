import { exp, expL } from '..';
import { useMutation, useQuery } from '@tanstack/react-query';
import { backendUrl } from '../main/utils/url';
import { useContext, useMemo } from 'react';
import RefetchContext from '../../context/refetch';
import { uiTime } from '../main/utils/function';

interface MainINT {
   name: string;
   date: string;
   tag: string;
   userId: string;
   setEllipse: Function;
   ellipse: string;
   query: { refetch: Function };
   mode: boolean;
   id: string;
}
export const Main = ({ userId, mode, date, tag, name, id, setEllipse, query, ellipse }: MainINT) => {
   let [auth, profileImg] = [localStorage.getItem('-jwtKey-'), localStorage.getItem('profileImg')];
   let { updateRef, reft, setreft } = useContext(RefetchContext);

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

   let { data } = useQuery({
      queryFn: async () => {
         const A = await fetch(`${backendUrl}/getUser`, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
               Authorization: `${auth}`,
            },
         });
         return A.json();
      },
      queryKey: ['getUser', 'common', reft],
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

   return (
      <div className={`flex flex-row items-center justify-between w-full relative mb-2`}>
         <div className='flex flex-row items-center w-full justify-start'>
            <div className={'w-auto h-auto mr-2 self-center'}>
               <img
                  src={profileImg ?? Exp}
                  className={`object-cover w-12 h-12 rounded-full border-2 ${
                     mode ? 'border-[hsl(0,0%,70%)]' : 'border-[hsl(0,0%,20%)]'
                  }`}
                  alt='profileImg'
               />
            </div>

            <div className='flex flex-col items-start place-self-start self-center'>
               <div className='flex flex-row items-center'>
                  <p className={`${mode ? 'text-slate-100' : 'text-[#191919]'} font-play text-base font-semibold`}>{name}</p>
                  <p
                     className={`font-play text-xs font-normal ml-3 ${mode ? 'text-slate-100' : 'text-[#191919]'} font-semibold `}
                  >
                     {uiTime(new Date(date))}
                  </p>
               </div>

               <small className={`${mode ? 'text-slate-100' : 'text-[#191919]'} font-play text-sm text-opacity-50 font-semibold`}>
                  {tag}
               </small>
            </div>
         </div>
         <div
            className={`${mode ? 'bg-[#202020]' : 'bg-[#ffffff]'} ${
               ellipse === id ? 'grid' : 'hidden'
            }  grid-cols-1 rounded-lg h-auto py-2
          rounded-tr-none shadow-lg p-3 absolute z-50 right-2 top-7 w-[50%]`}
         >
            <div
               className={`flex flex-row items-center cursor-pointer ${data && userId === data?.user._id ? 'hidden' : ''}`}
               data-user={userId}
               data-post={id}
               onClick={() => {
                  unFriendMutation.mutate(userId);
                  setTimeout(() => {
                     setreft('10000');
                     updateRef();
                  }, 1000);
               }}
            >
               <i
                  className={`${mode ? 'text-white' : 'text-black'} material-icons-outlined
             text-3l`}
               >
                  block
               </i>
               <p className={`${mode ? 'text-white' : 'text-black'} font-play text-base font-medium ml-3`}>Unfollow</p>
            </div>
            <div
               className={`flex-row items-center cursor-pointer ${data && userId === data.user._id ? 'flex' : 'hidden'}`}
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
               <p className={`${mode ? 'text-white' : 'text-black'} font-play text-base font-medium ml-3`}>Delete</p>
            </div>
         </div>
         <div
            className='flex justify-end text-center self-start w-[10%] mr-0 cursor-pointer'
            onClick={() => {
               if (ellipse === id) setEllipse('');
               else setEllipse(id);
            }}
         >
            <i className={`material-icons-outlined text-2xl text-center ${mode ? 'text-white' : 'text-black'}`}>more_vert</i>
         </div>
      </div>
   );
};
