import { useContext } from 'react';
import ThemeContext from '../../../../context/theme';
const DesktopNavbar = () => {
  let { mode } = useContext(ThemeContext);

  return (
    <div className='border-b border-[#f1f1f1] w-full'>
      <nav className='w-full flex flex-row items-center px-5 py-1 justify-between'>
        <div className='flex flex-row items-center w-full'>
          <i className={`fa text-3xl mr-2 ${mode ? 'text-[#FAFAF9]' : 'text-[#111111]'}`}>
            &#xf20e;
          </i>
          <p
            className={`text-xl font-play font-semibold text-black uppercase ${
              mode ? 'text-[#FAFAF9]' : 'text-[#111111]'
            }`}
          >
            Twilight
          </p>
        </div>
        <div className='flex flex-row items-center justify-between w-[15%]'>
          <div className='flex flex-row items-center justify-center relative'>
            <i
              className={`material-icons-outlined text-2xl ${
                mode ? 'text-[#FAFAF9]' : 'text-[#111111]'
              }`}
              title='notification'
            >
              notifications
            </i>
          </div>
          <div className='flex justify-center relative'>
            <i
              className={`material-icons-outlined text-2xl ${
                mode ? 'text-[#FAFAF9]' : 'text-[#111111]'
              }`}
              title='mode'
            >
              chats
            </i>
          </div>
          <div className='w-auto h-auto flex flex-row items-center'>
            <div className='h-2 w-2 rounded-full bg-orange-700 animate-bounce'></div>
            <div className='h-2 w-2 rounded-full bg-yellow-700 mx-2 animate-bounce'></div>
            <div className='h-2 w-2 rounded-full bg-green-700 animate-bounce'></div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DesktopNavbar;
