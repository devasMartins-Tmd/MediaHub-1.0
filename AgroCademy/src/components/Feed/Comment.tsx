import { useMutation } from '@tanstack/react-query';
import { useContext, useRef, useState } from 'react';
import { backendUrl } from '../main/utils/url';
import RefetchContext from '../../context/refetch';

export const InputComment = ({
  mode,
  query,
  postId,
}: {
  mode: boolean;
  query: { refetch: Function };
  postId: string;
}) => {
  let [commentText, setcommentText] = useState('');
  let { updateRef } = useContext(RefetchContext);

  let auth = localStorage.getItem('-jwtKey-');

  let sendCommentMutation = useMutation({
    mutationFn: async () => {
      const A = await fetch(`${backendUrl}/function/post/comment/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${auth}`,
        },
        body: JSON.stringify({ comment: commentText, postId }),
      });
      return A.json();
    },
    mutationKey: ['sendComment', 'post'],

    onSuccess: () => query.refetch({ queryKey: ['post', 'getpost'] }),
  });

  let ref = useRef<any>();

  return (
    <div
      className={`${
        mode ? 'bg-[#242424]' : 'text-[#FAFAFA]'
      } flex flex-row items-center w-full shadow rounded sticky bottom-0`}
    >
      <input
        type={'text'}
        className={`p-2 font-open text-sm w-[85%] outline-none ${
          mode ? 'bg-[#e6e6e6]' : 'text-[#252525]'
        } rounded-l`}
        alt='input'
        ref={ref}
        onChange={(e) => setcommentText(e.target.value)}
        placeholder='Write a comment'
      />
      <div className='flex flex-row items-center gap-3 px-2'>
        {['add_reaction', 'send'].map((item, index) => {
          return (
            <i
              className={`${
                mode ? 'text-gray-100' : 'text-[#191919]'
              } text-xl material-icons-outlined text-gray-500 cursor-pointer`}
              key={index}
              onClick={() => {
                if (item === 'send') {
                  sendCommentMutation.mutate();
                  ref.current.value = '';
                  setTimeout(() => updateRef(), 300);
                }
              }}
            >
              {item}
            </i>
          );
        })}
      </div>
    </div>
  );
};
