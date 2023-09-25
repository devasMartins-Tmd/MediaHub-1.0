import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/auth';
import { LoginAuth } from '..';
import { useMutation } from '@tanstack/react-query';
import { authenticationFn } from './query';
import { backendUrl } from '../main/utils/url';

const SignUpAuth: React.FC = () => {
  let { setAuthPage } = useContext(AuthContext);

  let [formState, setformState] = useState({
    name: '',
    email: '',
    password: '',
    tag: '',
  });

  const handleInput = (e: any) => {
    let { name, value: val } = e.target;
    let tagVal = name === 'tag' ? (val === 'farmer' ? 1 : 0) : val;
    setformState((prev) => ({
      ...prev,
      [name]: tagVal,
    }));
  };

  const mutation = useMutation({
    mutationFn: () => authenticationFn(backendUrl + '/auth/signup', formState),
    mutationKey: ['signup', 'auth'],
  });

  useEffect(() => {
    if (mutation.status == 'loading') console.log('loading...');
    if (mutation.status == 'error') console.log(mutation.error);
    if (mutation.status == 'success') console.log(mutation.data);
  }, [mutation.status]);

  return (
    <form className={'w-[78%] flex flex-col items-center gap-3 justify-evenly h-[90%] mx-auto '}>
      <div className='flex flex-col items-start justify-between gap-1 w-full'>
        <input
          type={'text'}
          className='sm:p-3 p-2 block w-full outline-none rounded bg-[#FAFAFA] border border-zinc-100'
          placeholder='name'
          onChange={handleInput}
          name='name'
        />
      </div>
      <div className='flex flex-col items-start justify-between gap-1 w-full'>
        <input
          type={'email'}
          className='sm:p-3 p-2 block w-full outline-none rounded bg-[#FAFAFA] border border-zinc-100'
          placeholder='email'
          onChange={handleInput}
          name='email'
        />
      </div>
      <div className='flex flex-col items-start w-full justify-between'>
        <select
          name='tag'
          id='person'
          onChange={handleInput.bind(this)}
          className='sm:p-3 p-2 block w-full outline-none rounded bg-[#FAFAFA] border border-zinc-100'
        >
          <option className='font-slab text-base text-center text-zinc-400' value='customer'>
            Are you a farmer?❔
          </option>
          <option className='font-slab text-base' value='customer'>
            No
          </option>
          <option className='font-slab text-base' value='farmer'>
            Yes
          </option>
        </select>
      </div>
      <div className='flex flex-col items-startjustify-between gap-1 w-full'>
        <input
          type={'password'}
          className='sm:p-3 p-2 block w-full outline-none rounded bg-[#FAFAFA] border border-zinc-100'
          placeholder='password'
          name='password'
          onChange={handleInput}
        />
      </div>
      <button
        className='sm:p-3 p-2 rounded-sm bg-zinc-800 text-white block w-full text-center font-slab text-lg font-normal'
        type='button'
        onClick={() => {
          console.log(formState);
          mutation.mutate();
        }}
      >
        Signup
      </button>
      <div
        className='flex justify-start w-full cursor-pointer'
        onClick={() => setAuthPage({ currentPage: <LoginAuth /> })}
      >
        <p className='font-open text-sm font-medium'>Already have an account? Log in</p>
      </div>
    </form>
  );
};
export default SignUpAuth;
