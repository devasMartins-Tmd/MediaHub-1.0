import { MainNavbar, SideBar, exp, expL } from '../..';
import PageContext from '../../../context/page';
import ToggleBarContext from '../../../context/sidebar';
import { useContext, useEffect, useMemo } from 'react';
import ThemeContext from '../../../context/theme';
import { useNavigate } from 'react-router-dom';
import { OxO } from './0x';
import { backendUrl } from '../utils/url';
import { useQuery } from '@tanstack/react-query';

const UI = () => {
  let { flag } = useContext(ToggleBarContext);
  let { page } = useContext(PageContext);
  let { mode } = useContext(ThemeContext);

  let navigate = useNavigate();
  let auth = localStorage.getItem('-jwtKey-');

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

  let Exp: string = useMemo(() => {
    return mode ? expL : exp;
  }, [mode]);

  useEffect(() => {
    if (isError) refetch();
  }, [isError]);

  return (
    <main className='flex flex-col items-center w-full'>
      <MainNavbar />
      <OxO
        SideBar={SideBar}
        flag={flag}
        mode={mode}
        page={page}
        navigate={navigate}
        profileImg={data?.user.profileImg || Exp}
      />
    </main>
  );
};

export default UI;
