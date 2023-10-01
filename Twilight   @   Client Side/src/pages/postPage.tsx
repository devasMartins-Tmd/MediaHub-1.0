import { useContext, useState } from 'react';
import { Button, MainNavbar } from '../components';
import ThemeContext from '../context/theme';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { backendUrl } from '../components/main/utils/url';

type stateType = {
  img: string | ArrayBuffer | null;
  text: string;
  likes: number;
  comment: object[];
  postId: string;
};

const PostPage = () => {
  let { mode } = useContext(ThemeContext);
  let navigate = useNavigate();
  let [state, setstate] = useState<stateType>({
    text: '',
    img: '',
    likes: 0,
    comment: [],
    postId: '',
  });

  let auth = localStorage.getItem('-jwtKey-');

  const HandleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file;
    if (e.target.files !== null) file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      setstate((prev) => ({ ...prev, img: reader.result }));
    };
    reader.readAsDataURL(file || new Blob());
  };

  let mutate = useMutation({
    mutationFn: async () => {
      const A = await fetch(`${backendUrl}/function/post/post`, {
        method: 'POST',
        headers: {
          Authorization: `${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state),
      });
      const B = await A.json();
      return B;
    },
    mutationKey: ['post'],
    onSuccess(data) {
      console.log(data);
      navigate(-1);
    },
  });

  return (
    <section>
      <MainNavbar />

      <section
        className={`flex flex-col items-center sm:w-1/2 mx-auto w-full p-4
      ${mode ? 'bg-[#4b4b4bfd]' : 'bg-[#ffffff] shadow-2xl'}`}
      >
        <div className='sm:w-[45%] ml-2 h-auto'>
          {state.img ? (
            <img
              src={`${state.img}`}
              className='object-cover rounded-lg shadow w-full'
              alt='post'
            />
          ) : (
            <></>
          )}
        </div>
        <textarea
          onChange={(e) => setstate((prev) => ({ ...prev, text: e.target.value }))}
          className={`font-play font-semibold text-left p-3 text-base border w-full outline-none ${
            mode
              ? 'border-[#2b2b2b] bg-[#464646] text-[#F7F7F9]'
              : 'text-[#2B2B2B] border-gray-200 bg-[#FAFAF9]'
          }`}
        />

        <div className='flex flex-row items-center w-full justify-between'>
          <div className={`w-auto h-auto`}>
            <input
              type={'file'}
              className='font-play text-base font-medium'
              placeholder='Image'
              onChange={(e) => HandleFile(e)}
            />
          </div>

          <div className='flex flex-row items-center mt-3'>
            <div className='mr-5 w-auto h-auto' onClick={() => navigate(-1)}>
              <Button
                text='Go back'
                color={mode ? `text-gray-50` : `text-[#191919]`}
                bg={`bg-green-200`}
              />
            </div>

            <div
              className='w-auto h-auto'
              onClick={() => {
                state.text || state.img ? mutate.mutate() : '';
              }}
            >
              <Button
                text='Post'
                color={mode ? `text-gray-50` : `text-[#191919]`}
                bg={`bg-orange-200`}
              />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default PostPage;
