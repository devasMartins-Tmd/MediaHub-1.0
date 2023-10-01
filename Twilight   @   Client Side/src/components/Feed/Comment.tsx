import { useMutation } from '@tanstack/react-query';
import { useContext, useRef, useState } from 'react';
import { backendUrl } from '../main/utils/url';

// import RefetchContext from '../../context/refetch';
import CommentContext from '../../context/comment';
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
  let { setCommentMod } = useContext(CommentContext);

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

    onSuccess: () => {
      query.refetch({ queryKey: ['post', 'getpost'] });
      updateRef();
    },
  });

  let ref = useRef<any>();

  return (
    <div className={`flex flex-row items-stretch w-full rounded sticky bottom-0 justify-between`}>
      <input
        type={'text'}
        className={`p-2 font-open text-sm w-[89%] outline-none ${
          mode
            ? 'bg-[hsl(0,0%,20%)] text-[hsl(0,0%,90%)] placeholder:text-[hsl(0,0%,80%)]'
            : 'bg-[hsl(0,0%,96%)] text-[hsl(0,0%,15%)]'
        } rounded-l`}
        alt='input'
        ref={ref}
        onChange={(e) => setcommentText(e.target.value)}
        placeholder='Write a comment'
      />
      <div
        className={`flex flex-row items-center gap-3 justify-center w-[11%] rounded ml-2 ${
          mode ? 'bg-[hsl(0,0%,20%)]' : 'bg-[hsl(0,0%,70%)]'
        }`}
      >
        <i
          className={`${
            mode ? 'text-[hsl(0,0%,90%)]' : 'text-[hsl(0,0%,10%)]'
          } text-2xl material-icons-outlined cursor-pointer self-center`}
          onClick={() => {
            sendCommentMutation.mutate();
            ref.current.value = '';
            setCommentMod(postId);
          }}
        >
          send
        </i>
      </div>
    </div>
  );
};
