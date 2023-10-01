import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FaceComponent = () => {
  let navigate = useNavigate();
  const Switch = () => setTimeout(() => navigate('/index'), 4300);

  useEffect(() => {
    Switch();
  });
  return (
    <section className='w-screen h-screen bg-[#53b463] flex justify-center'>
      <section className='flex flex-col items-center self-center'>
        <p className='font-open font-semibold text-3xl text-center'>
          Twil<span className='text-[#8dffb8]'>i</span>ght
        </p>
        <div className='flex flex-row items-center self-center relative'>
          <motion.div
            initial={{ width: '0' }}
            whileInView={{ width: '100px', transition: { duration: 4 } }}
            className='w-4 h-1 rounded-full mt-3 bg-[#2fff7f]'
          ></motion.div>
        </div>
      </section>
    </section>
  );
};

export default FaceComponent;
