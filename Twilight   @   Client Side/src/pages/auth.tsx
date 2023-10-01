import { useContext } from "react";
import { authData, authImg } from "../components/index";
import AuthContext from "../context/auth";

const Authentication: React.FC = () => {
  let { authPage } = useContext(AuthContext);

  const login = authData.login.map((item, index) => {
    return (
      <div className="flex flex-row items-center w-full ml-10 mb-2" key={index}>
        <span className="h-4 w-4 rounded-full bg-black flex justify-center mr-2">
          <span className="text-white font-open self-center text-[8px]">{index + 1}</span>
        </span>
        <p className="text-xs font-open font-medium text-white">{item}</p>
      </div>
    );
  });

  const signup = authData.signup.map((item, index) => {
    return (
      <div className="flex flex-row items-center w-full ml-10 mb-2" key={index}>
        <span className="h-4 w-4 rounded-full bg-black flex justify-center mr-2">
          <span className="text-white font-open self-center text-[8px]">{index + 1}</span>
        </span>
        <p className="text-xs font-open font-medium text-white">{item}</p>
      </div>
    );
  });

  return (
    <main className="flex justify-center w-full h-screen bg-[#101010]">
      <section className="sm:w-[72%] w-[90%] mx-auto h-[70%] flex sm:flex-row self-center items-center">
        <div className="relative w-[45%] h-full sm:flex hidden justify-center">
          <img src={authImg} className="absolute object-cover w-full h-full z-10" alt="authImg" />
          <div className="w-full h-full bg-[#2B2B2B] bg-opacity-90 z-20 absolute"></div>
          <div className="flex flex-col items-start w-3/4 mx-auto h-[79%] justify-between z-50 self-center">
            <h1 className="text-3xl text-left font-open text-white">Authentication</h1>
            <div className="flex flex-col items-center w-[95%] mr-0 h-[72%] my-auto justify-center">
              <section className="flex flex-col items-start w-full">
                <div className="w-auto h-auto py-1 px-3 bg-black bg-opacity-60 rounded shadow">
                  <h1 className="text-sm text-left font-open text-white animate-pulse">Sign Up</h1>
                </div>
                <div className="flex flex-col items-center w-full mt-3">{signup}</div>
              </section>
              <section className="flex flex-col items-start w-full mt-5">
                <div className="w-auto h-auto py-1 px-3 bg-black bg-opacity-60 rounded shadow">
                  <h1 className="text-sm text-left font-open text-white animate-pulse">Log in</h1>
                </div>
                <div className="flex flex-col items-center w-full mt-3">{login}</div>
              </section>
            </div>
            <div className="flex flex-row items-center">
              <i className="fa text-2xl mr-2">&#xf20d;</i>
              <p className="text-base font-open text-white uppercase">Agrocademy</p>
            </div>
          </div>
        </div>
        <div className="sm:w-[55%] w-full bg-white h-full flex flex-col justify-center relative">
          <div className="w-full h-full z-10 absolute left-0 top-0"></div>
          <div className="flex flex-col items-center mt-2">
            <div className="w-[40px] h-[40px] p-0.5 bg-[#F2F2F2] rounded-full shadow-md flex justify-center">
              <i className="fa text-3xl self-center">&#xf20d;</i>
            </div>
            <p className="text-base font-open font-semibold text-black uppercase">Agrocademy</p>
          </div>
          <div className="w-full h-3/4 my-auto z-30">{authPage.currentPage}</div>
        </div>
      </section>
    </main>
  );
};

export default Authentication;
