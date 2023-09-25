import { Route, Routes } from 'react-router-dom';
import { Authentication, PostPage, UI } from './components';
import { AuthContextProvider } from './context/auth';
import { ToggleBarProvider } from './context/sidebar';
import { ThemeProvider } from './context/theme';
import { PageProvider } from './context/page';
import { CommentProvider } from './context/comment';
import { RefetchProvider } from './context/refetch';

//App: root component
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToggleBarProvider>
        <AuthContextProvider>
          <PageProvider>
            <CommentProvider>
              <RefetchProvider>
                <Routes>
                  <Route element={<Authentication />} path={'/'}></Route>
                  <Route element={<UI />} path={'/home'}></Route>
                  <Route element={<PostPage />} path={'/post'}></Route>
                </Routes>
              </RefetchProvider>
            </CommentProvider>
          </PageProvider>
        </AuthContextProvider>
      </ToggleBarProvider>
    </ThemeProvider>
  );
};

export default App;
