import DesktopNavbar from "./desktop";
import MobileNavbar from "./mobile";

const MainNavbar: React.FC = () => {
  return (
    <header className="flex flex-row items-center justify-between w-full">
      <div className="w-full">
        <div className="sm:hidden w-full flex flex-col">
          <MobileNavbar />
        </div>
        <div className="sm:flex w-full hidden flex-col">
          <DesktopNavbar />
        </div>
      </div>
    </header>
  );
};
export default MainNavbar;
