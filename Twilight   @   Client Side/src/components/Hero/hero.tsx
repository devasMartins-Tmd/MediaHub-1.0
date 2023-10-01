import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Hero: React.FC = () => {
  let navigate = useNavigate();
  return (
    <>
      <motion.main
        className="flex justify-center w-full z-10 py-5 self-center p-3"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ ease: "easeOut", duration: 1 }}
      >
        <article
          className={"sm:w-[75%] w-full mx-auto flex flex-col items-center self-center text-center"}
        >
          <h3 className={"text-3xl font-medium text-white font-scope text-center"}>
            Special Forum for Agronomist, Farmers, and Consumers
          </h3>
          <p className="w-full text-sm text-gray-200 font-gil w-60% font-thin herop mt-3 mb-6 mx-auto">
            Farmer Hub is an innovative online platform that serves as a central hub for farmers,
            providing them with a comprehensive range of resources, tools, and services to enhance
            their agricultural practices and business operations. It is designed to empower farmers
            and support them in achieving greater productivity, profitability, and sustainability.
          </p>
          <button
            type={"button"}
            className="rounded text-white bg-zinc-900 py-3 px-5 shadow cursor-pointer hover:bg-gray-700 mx-auto flex
            flex-row justify-center items-center gap-3"
            onClick={() => {
              navigate("/auth");
            }}
          >
            <i className="fa text-xl text-white self-center">&#xf015;</i>
            <p className="text-sm font-gil font-medium self-center">Join Forum</p>
          </button>
        </article>
      </motion.main>
    </>
  );
};

export default Hero;
