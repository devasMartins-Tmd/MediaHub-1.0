import { useContext, useEffect, useState, useMemo } from 'react';
import ThemeContext from '../../../../context/theme';
const Switcher2 = () => {
  const [isChecked, setIsChecked] = useState(false);
  let { mode, setmode } = useContext(ThemeContext);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setmode(!isChecked);
  };

  let Translate = useMemo(() => {
    return mode && isChecked;
  }, [mode, isChecked]);

  useEffect(() => {
    console.log(isChecked, mode, Translate);
    const body = document.querySelector('body') as HTMLBodyElement;
    body.className = mode ? 'bg-[hsl(0,3%,10%)]' : 'bg-[hsl(0,0%,100%)]';
  }, [mode, isChecked]);

  return (
    <>
      <label className='themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center'>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={handleCheckboxChange}
          className='sr-only'
        />
        <span
          className={`slider mx-4 flex h-6 w-[45px] items-center rounded-full p-1 duration-200 ${
            mode ? 'bg-[#ad2828]' : 'bg-stone-500'
          }`}
        >
          <span
            className={`dot h-4 w-4 rounded-full bg-white duration-200 ${
              isChecked ? 'translate-x-[28px]' : ''
            }`}
          ></span>
        </span>
      </label>
    </>
  );
};

export default Switcher2;
