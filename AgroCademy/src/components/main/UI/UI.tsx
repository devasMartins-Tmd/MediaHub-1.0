import { MainNavbar, SideBar, exp, expL } from '../..';
import PageContext from '../../../context/page';
import ToggleBarContext from '../../../context/sidebar';
import { useContext, useMemo } from 'react';
import ThemeContext from '../../../context/theme';
import { useNavigate } from 'react-router-dom';
import { OxO } from './0x';

const UI = () => {
   let { flag } = useContext(ToggleBarContext);
   let { page } = useContext(PageContext);
   let { mode } = useContext(ThemeContext);

   let navigate = useNavigate();
   let [profileImg] = [localStorage.getItem('profileImg')];

   let Exp: string = useMemo(() => {
      return mode ? expL : exp;
   }, [mode]);

   return (
      <main className='flex flex-col items-center w-full'>
         <MainNavbar />
         <OxO SideBar={SideBar} flag={flag} mode={mode} page={page} navigate={navigate} profileImg={profileImg || Exp} />
      </main>
   );
};

export default UI;
