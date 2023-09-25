//* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *
//*  ** ** ** ** ** ** Authentication folder ** ** ** ** ** ** ** ** *
export { default as Authentication } from '../pages/auth'; //** ** * *
//* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *

//* * * * * * * * Image Folder (Assets) * * * * * * * * *  * * * * *
import greenhouse from '../assets/greenhouse.jpg'; // * * * * * *  *
import B015 from '../assets/B015.jpg'; // * * * * * *  *
export { default as exp } from '../assets/exp.webp';
export { default as expL } from '../assets/icons8-person-64 (1).webp';
export { default as empty } from '../assets/empty.png';
//** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//* * * * * * * *  * * * * * Export *  * * * * * * * * * * * * * * *
export { greenhouse as authImg, B015 as profileImg }; //*  * * * * *

//* * * * * * * * * * * * Data Folder * * * * * * * * * * * *  *
export { default as authData } from './data/auth_data'; // * * *
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

//* * * * * * * * * * * * Auth Folder * * * * * * * * * * * *  *
export { default as SignUpAuth } from './auth/signup'; //* * * *
export { default as LoginAuth } from './auth/login'; //* * * *
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

//* * * * * * * * * * * * main Folder * * * * * * * * * * * *  * * * * *
//* * * * * * * * * * * * navbar Folder ** * * * * * * * * * * * * * * *
export { default as MobileNavbar } from './main/bars/navbar/mobile'; // *
export { default as DesktopNavbar } from './main/bars/navbar/desktop'; // *
export { default as MainNavbar } from './main/bars/navbar/navbar'; // *
//* * * * * * * * * * * * sidebar Folder ** * * * * * * * * * * * * * * *
export { default as SideBar } from './main/bars/sidebar/sidebar'; // * * *
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//* * * * * * * * * * * * UI Folder ** * * * * * * * * * * * * * * *
export { default as UI } from './main/UI/UI.tsx'; // * * *
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

//* * * * * * * * * * * * main/utils Folder * * * * * * * * * * * *  * * * * *
export { default as Switch } from './main/utils/switch/switch'; // * * * * * *
export { default as Button } from './main/utils/button.tsx'; // * * * * * ** *
export { default as EmptyField } from './main/utils/empty.tsx'; // * * * * * ** *
export { default as Loader } from './main/utils/loader/loader.tsx'; // * * * *
export { default as PostTemplate } from './Feed/0xFeed.tsx'; // * * * *
//* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  * * * * * * * *

//* * * * * * * * * * * * pages Folder * * * * * * * * * * * *  * * * * *
export { default as FeedPage } from '../pages/FeedPage.tsx'; // * * * * *
export { default as ExplorePage } from '../pages/ExplorePage.tsx'; // * *
export { default as FriendPage } from '../pages/FriendPage.tsx'; // * * *
export { default as PostPage } from '../pages/postPage.tsx'; // * * *
//** * * * * * * * * * * * * * * * * * * * * * * * * * * * *  * * * * * *
