import { LikeNComment } from './LikeNComment';
import { InputComment } from './Comment';
import { Main } from './Main';
import { useQuery } from '@tanstack/react-query';
import { backendUrl } from '../main/utils/url';
import { useState, useEffect, useContext } from 'react';
import CommentContext from '../../context/comment';
import RefetchContext from '../../context/refetch';
import { EmptyField } from '..';

interface postProps {
   img?: string;
   name: string;
   text: string;
   date: string;
   tag: string;
   likes: number;
   comment: any[];
   userId: string;
   mode: boolean;
   id: string;
   ellipse: string;
   setEllipse: Function;
   query: { refetch: Function };
   isLiked: boolean;
}

export default function PostTemplate({
   img,
   name,
   text,
   date,
   tag,
   likes,
   comment,
   userId,
   id,
   mode,
   ellipse,
   setEllipse,
   query,
   isLiked,
}: postProps) {
   let [auth] = [localStorage.getItem('-jwtKey-')];
   let [show, setshow] = useState(false);
   let { commentMod } = useContext(CommentContext);
   let { reft } = useContext(RefetchContext);

   let { status, data } = useQuery({
      queryKey: ['getComment', 'comment', commentMod, reft],
      queryFn: async () => {
         const A = await fetch(`${backendUrl}/function/post/comment/get/${commentMod}`, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
               Authorization: `${auth}`,
            },
         });
         return A.json();
      },
      enabled: !!commentMod,
   });

   useEffect(() => {
      if (status === 'success') setshow(true);
   }, [status]);

   return (
      <>
         <section
            className={`${mode ? 'bg-[hsl(0,0%,15%)] sm:rounded-lg sm:shadow-lg' : 'bg-[hsl(0,0%,100%)]'} ${
               show ? 'overflow-y-scroll' : ''
            } flex flex-col items-center w-full sm:shadow sm:border-none p-3 sm:rounded max-h-[400px] relative`}
            data-user={userId}
            data-post={id}
         >
            <div className={`${ellipse === id ? 'flex' : 'hidden'} absolute w-full h-full top-0 bg-black bg-opacity-30`}></div>
            <Main
               name={name}
               date={date}
               tag={tag}
               userId={userId}
               setEllipse={setEllipse}
               ellipse={ellipse}
               query={query}
               mode={mode}
               id={id}
            />

            <div className='w-full flex justify-start my-0.5 ml-5 max-h-[30%] overflow-scroll' id={'post_scroll'}>
               <p className={`${mode ? 'text-slate-100' : 'text-[#191919]'} text-sm text-left font-play font-medium h-auto`}>{text}</p>
            </div>

            <div className='w-full h-auto'>
               {img ? <img src={img} className={`object-cover w-full max-h-[150px] rounded shadow`} alt='post_image' /> : <></>}
            </div>

            <LikeNComment mode={mode} likes={likes} comment={comment} userId={userId} id={id} query={query} isLiked={isLiked} />
            <div
               className={`flex flex-col w-full gap-4 shadow-inner justify-center ${mode ? 'bg-[#181717]' : ''} mb-2 ${
                  show && commentMod === id ? 'w-full flex min-h-[250px] sticky top-0 overflow-scroll' : 'hidden'
               }`}
            >
               {data && data.comments.length > 0 ? (
                  data.comments.map((item: any, index: number) => {
                     return (
                        <div className='flex flex-row items-start w-full p-2 px-4 border-y' key={index}>
                           <div className={`${mode ? 'border-green-200' : 'border-black'} w-10 h-10 rounded-full shadow border`}></div>
                           <div className='flex flex-col items-start ml-3'>
                              <p
                                 className={`${
                                    mode ? 'text-[hsl(0,0%,90%)]' : 'text-[hsl(0,0%,20%)]'
                                 } font-play text-sm text-left ml-3 font-semibold`}
                              >
                                 {item.name}
                              </p>
                              <p
                                 className={`${
                                    mode ? 'text-[hsl(0,0%,90%)]' : 'text-[hsl(0,0%,10%)]'
                                 } font-play text-xs text-left ml-3 font-medium`}
                              >
                                 {item.text}
                              </p>
                           </div>
                        </div>
                     );
                  })
               ) : status === 'loading' ? (
                  <div className='w-full flex justify-center h-full'>
                     <i className='text-xl self-center material-icons-outlined animate-spin'>autorenew</i>
                  </div>
               ) : (
                  <EmptyField text='Comment section' size='w-full' />
               )}
            </div>
            <InputComment mode={mode} query={query} postId={id} />
         </section>
         <div className='h-[1px] sm:hidden flex w-full bg-[hsl(0,0%,80%)]'></div>
      </>
   );
}
