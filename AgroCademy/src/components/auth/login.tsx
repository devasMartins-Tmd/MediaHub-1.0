import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth';
import { useEffect, useState, useContext } from 'react';
import { SignUpAuth } from '..';
import { useMutation } from '@tanstack/react-query';
import { authenticationFn } from './query';
import { backendUrl } from '../main/utils/url';

//Login: authentication component
const LoginAuth: React.FC = () => {
  let { setAuthPage } = useContext(AuthContext);
  let [form, setformState] = useState({
    email: '',
    password: '',
  });

  let navigate = useNavigate();

  const handleInput = (e: any) => {
    let { name, value: val } = e.target;
    let tagVal = name === 'tag' ? (val === 'farmer' ? 1 : 0) : val;
    setformState((prev) => ({
      ...prev,
      [name]: tagVal,
    }));
  };

  const mutation = useMutation({
    mutationFn: () => authenticationFn(backendUrl + '/auth/login', form),
    mutationKey: ['login', 'auth'],
  });

  useEffect(() => {
    if (mutation.status == 'loading') console.log('loading...');
    if (mutation.status == 'error') console.log(mutation.error);
    if (mutation.status == 'success') {
      console.log(mutation.data);
      localStorage.setItem('-jwtKey-', mutation.data.token);
      if (mutation.data.done) {
        navigate('/home');
      }
    }
  }, [mutation.status]);

  return (
    <form className={'w-[75%] flex flex-col items-start gap-3 justify-evenly h-[70%] mx-auto'}>
      <div className='flex flex-col items-start justify-between gap-1 w-full'>
        <input
          type={'email'}
          className='sm:p-3 p-2 block w-full outline-none rounded bg-[#FAFAFA] border border-zinc-100'
          placeholder='email'
          onChange={handleInput}
          name='email'
        />
      </div>
      <div className='flex flex-col items-start justify-between gap-1 w-full'>
        <input
          type={'password'}
          className='sm:p-3 p-2 block w-full outline-none rounded bg-[#FAFAFA] border border-zinc-100'
          placeholder='password'
          onChange={handleInput}
          name='password'
        />
      </div>
      <button
        className='p-2 rounded-sm bg-zinc-800 text-white block w-full text-center font-slab text-lg font-normal'
        type='button'
        onClick={() => {
          console.log(form);
          mutation.mutate();
          // navigate("/home");
        }}
      >
        Login
      </button>
      <div
        className='flex justify-center w-full cursor-pointer'
        onClick={() => setAuthPage({ currentPage: <SignUpAuth /> })}
      >
        <p className='font-open text-sm font-medium'>
          Don't have an account? <span className='font-semibold'>sign up</span>
        </p>
      </div>
    </form>
  );
};
export default LoginAuth;
