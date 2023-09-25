import { empty } from '../..';

const EmptyField = ({ text, size }: { text: string; size: string }) => {
  return (
    <section className=' w-full h-full flex justify-center mt-10'>
      <section
        className={`flex flex-col items-center self-center mx-auto p-3 border border-[#dfdede] ${size}`}
      >
        <p className='font-open text-lg font-semibold text-[#bdbdbd]'>{text} is empty!</p>
        <img
          src={empty}
          className={`object-cover text-4xl text-center place-self-center`}
          alt='empty'
        />
      </section>
    </section>
  );
};

export default EmptyField;
