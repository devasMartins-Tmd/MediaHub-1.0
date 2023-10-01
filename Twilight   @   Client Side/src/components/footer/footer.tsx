import { useNavigate } from "react-router-dom";
const footer: React.FC = () => {
  let navigate = useNavigate();
  return (
    <footer className="justify-between sm:hidden flex flex-row items-center w-full fixed bottom-0 bg-white border border-gray-300 py-3 px-5">
      <i
        className="fa text-xl font-thin text-gray-600 sm:hidden flex"
        onClick={() => navigate("/search")}
      >
        &#xf002;
      </i>
      <i className="material-icons text-xl" onClick={() => {}}>
        person_add_alt
      </i>
      <div>
        <i
          className="material-icons text-xl text-zinc-900"
          onClick={() => {
            {
            }
          }}
        >
          chat_bubble_outline
        </i>
      </div>
      <div className="flex flex-row items-center relative">
        <i className="material-icons text-xl text-zinc-900" onClick={() => {}}>
          notifications
        </i>
      </div>
    </footer>
  );
};
export default footer;
