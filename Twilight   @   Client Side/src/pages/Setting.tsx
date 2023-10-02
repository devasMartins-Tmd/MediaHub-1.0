import { useContext, useMemo, useState } from 'react';
import ThemeContext from '../context/theme';
import { exp, expL } from '../components';
import { backendUrl } from '../components/main/utils/url';
import { useMutation, useQuery } from '@tanstack/react-query';
import RefetchContext from '../context/refetch';
import { useNavigate } from 'react-router-dom';
import PageContext from '../context/page';

const putAccount = async (auth: string, info: object) => {
   const A = await fetch(`${backendUrl}/put/profile`, {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `${auth}`,
      },
      body: JSON.stringify(info),
   });
   return A.json();
};

const delAccount = async (auth: string, info: object) => {
   const A = await fetch(`${backendUrl}/delete/profile`, {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `${auth}`,
      },
      body: JSON.stringify(info),
   });

   return A.json();
};

const Setting = () => {
   let { mode } = useContext(ThemeContext);
   let [accp, setAccp] = useState('');
   let navigate = useNavigate();
   let { setPage } = useContext(PageContext);

   let [info, setinfo] = useState({
      name: '',
      email: '',
      oldPassword: '',
      newPassword: '',
      img: '',
   });

   let auth = localStorage.getItem('-jwtKey-');
   let { updateRef } = useContext(RefetchContext);

   const handleClick = (e: any) => {
      let { name, value } = e.target;
      setinfo((prev) => ({ ...prev, [name]: value }));
   };

   const profileMutation = useMutation({
      mutationFn: () => putAccount(auth || '', info),
      mutationKey: ['profile', 'update'],
      onSuccess: () => {
         updateRef();
         setPage('0x1');
      },
   });

   const deleteMutation = useMutation({
      mutationFn: () => delAccount(auth || '', { password: accp }),
      mutationKey: ['profile', 'delete'],
      onSuccess(data) {
         console.log(data);
         updateRef();
         navigate('/');
         localStorage.removeItem('profileImg');
      },
   });

   const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
      let file;
      if (e.target.files !== null) file = e.target.files[0];
      let reader = new FileReader();
      reader.onload = () => {
         setinfo((prev: any) => ({ ...prev, img: reader.result }));
      };
      reader.readAsDataURL(file || new Blob());
   };

   let { data, isError, refetch } = useQuery({
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
      queryKey: ['getUser', 'common'],
   });

   if (isError) refetch();

   let Exp: string = useMemo(() => {
      return mode ? expL : exp;
   }, [mode]);

   let inputClass = `rounded shadow p-3 outline-none font-play w-full ${
      mode ? 'text-[hsl(0,0%,90%)] bg-[hsl(0,0%,20%)]' : 'text-[hsl(0,0%,20%)] bg-[hsl(0,0%,90%)]'
   }`;

   return (
      <section className='flex flex-col items-start w-full justify-start'>
         <header className='w-full flex justify-center mb-3 border-b border-gray-200'>
            <h1 className={`${mode ? 'text-[hsl(0,0%,90%)]' : 'text-[hsl(0,0%,10%)]'} font-play text-xl`}>Settings</h1>
         </header>
         <p className={`${mode ? 'text-[hsl(0,0%,90%)]' : 'text-[hsl(0,0%,20%)]'} text-xl text-left font-medium font-play mb-3 px-4`}>
            Public Profile
         </p>
         <div className='flex flex-row items-start w-auto px-4'>
            <img
               src={data?.user.profileImg || Exp}
               className={`${mode ? 'border-[hsl(0,0%,90%)]' : 'border-[hsl(0,0%,20%)]'} border h-[70px] w-[70px] rounded-full shadow mr-5`}
               alt='profileImg'
            />
            <div className='flex flex-col items-start'>
               <button
                  type='button'
                  disabled={true}
                  className={`p-2 px-8 font-play text-sm border rounded ${
                     mode ? 'border-[hsl(0,0%,15%)] text-[hsl(0,0%,90%)]' : 'border-[hsl(0,0%,90%)] text-[hsl(0,0%,10%)]'
                  }`}
               >
                  Change Picture
               </button>
               <input
                  onChange={(e) => handleImg(e)}
                  type='file'
                  className={`p-2 px-7 font-play text-sm rounded mb-3 ${
                     mode ? 'bg-[hsl(0,0%,15%)] text-[hsl(0,0%,90%)]' : 'bg-[hsl(0,0%,90%)] text-[hsl(0,0%,10%)]'
                  }`}
               />
            </div>
         </div>
         <form className='sm:w-[75%] sm:mx-0 mx-auto w-[93%] flex flex-col mt-5'>
            <div className='grid sm:grid-cols-2 grid-cols-1 w-full gap-3'>
               <div className='flex flex-col items-start justify-start'>
                  <label htmlFor='Name' className={`${mode ? 'text-[hsl(0,0%,90%)]' : 'text-[hsl(0,0%,20%)]'} font-thin font-play`}>
                     First Name
                  </label>
                  <input
                     onChange={(e) => handleClick(e)}
                     type='text'
                     name='name'
                     placeholder={data?.user.name || 'john doe'}
                     className={inputClass}
                  />
               </div>
               <div className='flex flex-col items-start justify-start'>
                  <label htmlFor='email' className={`${mode ? 'text-[hsl(0,0%,90%)]' : 'text-[hsl(0,0%,20%)]'} font-thin font-play`}>
                     Email
                  </label>
                  <input
                     onChange={(e) => handleClick(e)}
                     type='email'
                     id='email'
                     name='email'
                     placeholder={data?.user.email || 'John@gmail.com'}
                     className={inputClass}
                  />
               </div>
            </div>
            <div className='flex flex-col items-start justify-start mt-2'>
               <label htmlFor='password' className={`${mode ? 'text-[hsl(0,0%,90%)]' : 'text-[hsl(0,0%,20%)]'} font-thin font-play`}>
                  Old Password
               </label>
               <input
                  onChange={(e) => handleClick(e)}
                  type='password'
                  id='oldPassword'
                  name='oldPassword'
                  placeholder={'xxxxxxxxxxxxx'}
                  className={inputClass}
               />
            </div>
            <div className='flex flex-col items-start justify-start mt-3'>
               <label htmlFor='password' className={`${mode ? 'text-[hsl(0,0%,90%)]' : 'text-[hsl(0,0%,20%)]'} font-thin font-play`}>
                  New password
               </label>
               <input
                  onChange={(e) => handleClick(e)}
                  type='password'
                  id='newPassword'
                  name='newPassword'
                  placeholder={'xxxxxxxxxxxxx'}
                  className={inputClass}
               />
            </div>
            <div className='flex justify-center w-full my-2'>
               <button
                  type='button'
                  onClick={() => {
                     profileMutation.mutate();
                     console.log(info);
                  }}
                  className={`w-full p-3 text-center font-play text-sm font-semibold rounded ${
                     mode ? 'text-[hsl(0,0%,90%)] bg-[hsl(129,17%,25%)]' : 'text-[hsl(0,0%,100%)] bg-[hsl(130,20%,40%)]'
                  }`}
               >
                  Save
               </button>
            </div>

            <button
               className={`mt-10 mb-2 text-base font-play p-1 border border-[red]  text-[red]
               `}
            >
               Danger
            </button>
            <div className='flex flex-col items-start w-full justify-start mt-3'>
               <label
                  htmlFor='delete_account'
                  className={`${mode ? 'text-[hsl(0,0%,90%)]' : 'text-[hsl(0,0%,20%)]'} font-thin font-play text-left`}
               >
                  Delete Account
               </label>
               <div className='flex sm:flex-row flex-col items-center w-full'>
                  <input
                     type='password'
                     id='account_password'
                     onChange={(e) => setAccp(e.target.value)}
                     placeholder={'Account Password - xxxxxxxxxxxxx'}
                     className={inputClass}
                  />
                  <button
                     type='button'
                     onClick={() => deleteMutation.mutate()}
                     className={`p-4 px-7 font-play text-sm rounded w-full sm:w-[35%] sm:ml-5 sm:mt-0 mt-2 ${
                        mode ? 'bg-[hsl(0,36%,25%)] text-[hsl(0,0%,90%)]' : 'bg-[hsl(0,41%,79%)] text-[hsl(0,0%,10%)]'
                     }`}
                  >
                     Delete Account
                  </button>
               </div>
            </div>
         </form>
      </section>
   );
};

export default Setting;
