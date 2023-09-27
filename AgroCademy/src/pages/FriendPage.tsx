import { useQuery } from '@tanstack/react-query';
import { Loader } from '../components';

const FriendPage = () => {
  // const { data, isSuccess, isLoading, isError } = useQuery({
  //   queryFn: async () => {
  //     const A = await fetch('', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     return A.json();
  //   },
  //   queryKey: ['getFriends'],
  // });

  // if (isLoading) return <Loader on={isLoading} />;

  return <main className='text-center text-white'>This is a Friend Page</main>;
};

export default FriendPage;
