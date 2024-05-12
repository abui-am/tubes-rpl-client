import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages';
import UserCreatePage from './pages/user-create';
import UserPage from './pages/user';
import { Toaster } from 'react-hot-toast';
import UserEditPage from './pages/user-edit';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/account/create',
    element: <UserCreatePage />,
  },
  {
    path: '/account',
    element: <UserPage />,
  },
  {
    path: '/account/:id/edit',
    element: <UserEditPage />,
  },
]);

function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
