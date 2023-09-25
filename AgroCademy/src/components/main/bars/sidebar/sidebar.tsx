import { useContext, useEffect, useMemo } from 'react';
import { Switch, exp, expL } from '../../..';
import { sidebarCol } from './data';
import ThemeContext from '../../../../context/theme';
import PageContext from '../../../../context/page';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { backendUrl } from '../../utils/url';

const Sidebar = () => {
  let navigate = useNavigate();
  let auth = localStorage.getItem('-jwtKey-');

  let [leftPartition, rightPartition] = [sidebarCol.slice(0, 4), sidebarCol.slice(4)];

  let { mode } = useContext(ThemeContext);

  let isdark = useMemo(() => {
    return mode === true;
  }, [mode]);
  let { setPage } = useContext(PageContext);

  let { isSuccess, data, isError, refetch } = useQuery({
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
    console.log(data);
  }, [isSuccess]);

  return (
    <section
      className={`${
        isdark ? 'bg-[#242424]' : 'bg-white'
      } flex flex-col items-center w-full shadow-xl`}
    >
      <header className='sm:hidden flex flex-row items-center w-full justify-between p-5'>
        <i
          className={`${
            isdark ? 'text-[#FAFAF9]' : 'text-[#111111]'
          } material-icons-outlined text-2xl`}
        >
          chevron_left
        </i>
        <i
          className={`${
            isdark ? 'text-[#FAFAF9]' : 'text-[#111111]'
          } material-icons-outlined text-2xl`}
          onClick={() => navigate('/')}
        >
          power_settings_new
        </i>
      </header>
      <section className='flex flex-col items-center justify-center w-full'>
        <div className='w-auto h-auto py-5'>
          <img
            src={data?.user.profileImg || Exp}
            className='object-cover sm:w-[70px] sm:h-[70px] w-[40px] h-[40px] rounded-full object-center'
            alt='profileImg'
          />
        </div>
        <div className='flex flex-col justify-center w-full'>
          <p
            className={`${
              isdark ? 'text-[#FAFAF9]' : 'text-[#111111]'
            } text-sm font-mukta font-medium text-center`}
          >
            {data?.user.name}
          </p>
          <small
            className={`${
              isdark ? 'text-[#FAFAF9]' : 'text-[#111111]'
            } font-mukta font-medium text-center`}
          >
            Farmers
          </small>
        </div>
        <section className='flex flex-col items-start w-full mt-10'>
          <LeftPart arr={leftPartition} setPage={setPage} isdark={isdark} />
          <RightPart arr={rightPartition} setPage={setPage} isdark={isdark} />
        </section>
      </section>
    </section>
  );
};

function RightPart({ arr, setPage, isdark }: { arr: any[]; setPage: Function; isdark: boolean }) {
  return (
    <>
      {arr?.map((item, index) => {
        return (
          <div
            className='flex flex-row items-center w-full justify-between mb-5
                hover:bg-transparent hover:bg-opacity-50 px-5 py-1 cursor-pointer'
            key={index + 1}
            onClick={() => setPage(item?.index)}
          >
            <div className='flex flex-row items-center'>
              <i
                className={`${
                  isdark ? 'text-[#FAFAF9]' : 'text-[#111111]'
                } material-icons-outlined text-xl mr-5`}
              >
                {item?.icon}
              </i>
              <span
                className={`${
                  isdark ? 'text-[#FAFAF9]' : 'text-[#111111]'
                } text-base font-mukta font-medium`}
              >
                {item?.name}
              </span>
            </div>
            <div className={`flex justify-center ${item?.name === 'Dark mode' ? '' : 'hidden'}`}>
              <Switch />
            </div>
          </div>
        );
      })}
    </>
  );
}

function LeftPart({ arr, setPage, isdark }: { arr: any[]; setPage: Function; isdark: boolean }) {
  return (
    <>
      {arr.map((item, index) => {
        return (
          <div
            className={`flex flex-row items-center w-full justify-between mb-5
                hover:bg- hover:bg-opacity-50 px-5 py-1 cursor-pointer`}
            key={index + 1}
            onClick={() =>
              item?.name !== 'Dark mode' ? setPage(item?.index) : console.log('Icon')
            }
          >
            <div className='flex flex-row items-center'>
              <i
                className={`${
                  isdark ? 'text-[#FAFAF9]' : 'text-[#111111]'
                } material-icons-outlined text-xl mr-5`}
              >
                {item?.icon}
              </i>
              <span
                className={`${
                  isdark ? 'text-[#FAFAF9]' : 'text-[#111111]'
                } text-base font-mukta font-medium`}
              >
                {item?.name}
              </span>
            </div>
            <div className={`flex justify-center ${item?.name === 'Dark mode' ? '' : 'hidden'}`}>
              <Switch />
            </div>
          </div>
        );
      })}
    </>
  );
}
export default Sidebar;
