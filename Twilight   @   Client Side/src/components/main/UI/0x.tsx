import { ReactNode, useContext, useEffect, useState } from 'react';
import PageContext from '../../../context/page';

interface param {
   SideBar: () => JSX.Element;
   flag: boolean;
   navigate: Function;
   mode: boolean;
   profileImg: string;
   page: ReactNode;
}

export const OxO = ({ SideBar, flag, navigate, mode, profileImg }: param) => {
   let { key, page } = useContext(PageContext);
   let [isFeedPage, setFeedPage] = useState(true);

   useEffect(() => {
      setFeedPage(key === '0x1' || key === '');
   }, [key, page]);

   return (
      <div className='flex sm:flex-row items-stretch w-full relative'>
         <div className='lg:w-[20%] md:w-[24%] sm:w-[30%]'>
            <div className='w-full sm:inline hidden'>
               <SideBar />
            </div>
            <div className={`w-[75%] sm:hidden flex absolute z-50 ${flag ? 'left-0' : '-left-full'} duration-500 bg-[#FAFAF9]`}>
               <SideBar />
            </div>
         </div>
         <div className={`sm:w-[73%] w-full mx-auto h-screen bg-transparent flex flex-col items-center`}>
            <section
               onClick={() => navigate('/post')}
               className={`${mode ? 'bg-[#2C2C2C] border-[#2b2b2b]' : 'border-gray-200'} sm:w-full w-[97%] mx-auto rounded border  ${
                  isFeedPage ? 'flex' : 'hidden'
               } flex-col items-center p-2 mt-2`}
            >
               <div className='flex flex-row items-center w-full'>
                  <div className='sm:w-auto h-auto mr-4 w-[10%]'>
                     <img
                        src={profileImg}
                        className='object-cover rounded-full sm:w-[40px] sm:h-[40px] h-[25px] w-[25px]'
                        alt='profile_img'
                     />
                  </div>
                  <input
                     type='search'
                     placeholder="What's on your mind"
                     className='outline-none bg-transparent w-[95%] text-sm font-medium font-play'
                  />
                  <div className='flex justify-center w-[10%]'>
                     <i className={`${mode ? 'text-[#FAFAF9]' : 'text-[#111111]'} material-icons-outlined text-2xl`}>collections</i>
                  </div>
               </div>
            </section>
            {page}
         </div>
      </div>
   );
};
