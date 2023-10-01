import { useContext } from 'react';
import ToggleBarContext from '../../../../context/sidebar';
import ThemeContext from '../../../../context/theme';

const MobileNavbar = () => {
  let { flag, setflag } = useContext(ToggleBarContext);
  let { mode } = useContext(ThemeContext);

  return (
    <div className='border-b border-[#f1f1f1]'>
      <main className='w-full flex flex-row items-center justify-between px-4 py-1'>
        <div className='flex flex-row items-center w-[55%]'>
          <i className={`fa text-2xl mr-2 ${mode ? 'text-[#FAFAF9]' : 'text-[#111111]'}`}>
            &#xf20e;
          </i>
          <p
            className={`text-xl font-play font-semibold ${
              mode ? 'text-[#FAFAF9]' : 'text-[#111111]'
            } uppercase`}
          >
            Twilight
          </p>
        </div>
        <div className='flex flex-row items-center justify-between w-auto'>
          <div className='w-auto h-auto flex flex-row items-center mr-5'>
            <div className='h-2 w-2 rounded-full bg-orange-700 animate-bounce'></div>
            <div className='h-2 w-2 rounded-full bg-yellow-700 mx-2 animate-bounce'></div>
            <div className='h-2 w-2 rounded-full bg-green-700 animate-bounce'></div>
          </div>
          <div className='flex justify-center' onClick={() => setflag(!flag)}>
            <i
              className={`material-icons-outlined text-4xl ${
                mode ? 'text-[#FAFAF9]' : 'text-[#111111]'
              }`}
            >
              menu
            </i>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MobileNavbar;
