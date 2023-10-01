const Loader = ({ on }: { on: boolean }) => {
  return (
    <section
      className={`${
        on ? 'flex' : 'hidden'
      } w-screen h-screen bg-black bg-opacity-30 justify-center fixed top-0 left-0 z-50`}
    >
      <main className='flex justify-center self-center w-auto h-auto'>
        <i className={`text-[60px] animate-spin text-center material-icons-outlined`}>autorenew</i>
      </main>
    </section>
  );
};

export default Loader;
