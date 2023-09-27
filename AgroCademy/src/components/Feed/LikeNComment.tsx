import { useMutation } from '@tanstack/react-query';
import { backendUrl } from '../main/utils/url';
import { useContext } from 'react';
import CommentContext from '../../context/comment';
import { queryClient } from '../../main';

export function LikeNComment({
  likes,
  comment,
  mode,
  userId,
  id,
  query,
}: {
  likes: number;
  comment: any[];
  mode: boolean;
  userId: string;
  id: string;
  query: { refetch: Function };
}) {
  let auth = localStorage.getItem('-jwtKey-');

  //mutate post like field
  const likeMutation = useMutation({
    mutationFn: async ({ id, userId }: { id: string; userId: string }) => {
      const A = await fetch(`${backendUrl}/function/post/like/inc/${id}/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${auth}`,
        },
      });
      return A.json();
    },

    mutationKey: ['like', 'postlike'],

    onSuccess: () => query.refetch(),
  });

  let { commentMod, setCommentMod } = useContext(CommentContext);

  return (
    <div
      className='flex flex-row items-center w-full justify-start my-2'
      data-user={userId}
      data-post={id}
    >
      {[
        { i: 'thumb_up_alt', val: likes },
        { i: 'comment', val: comment ? comment.length : 0 },
      ].map(({ i, val }, index) => {
        return (
          <div className='flex justify-start cursor-pointer mr-5' key={index}>
            <i
              className={`${
                mode ? 'text-[hsl(0,0%,80%)]' : 'text-[hsl(0,0%,10%)]'
              } text-2xl material-icons-outlined`}
              onClick={() => {
                if (index === 0) {
                  likeMutation.mutate({ id, userId });
                  queryClient.refetchQueries();
                } else {
                  query.refetch(['getComment', 'getPost']);
                  setCommentMod(id === commentMod ? '' : id);
                }
              }}
            >
              {i}
            </i>
            <span
              className={`${
                mode ? 'text-slate-100' : 'text-[#191919]'
              } text-base text-left ml-2 self-center font-medium`}
            >
              {val}
            </span>
          </div>
        );
      })}
    </div>
  );
}
