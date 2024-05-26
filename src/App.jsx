import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages';
import UserCreatePage from './pages/user-create';
import UserPage from './pages/user';
import { Toaster } from 'react-hot-toast';
import UserEditPage from './pages/user-edit';
import ItemsPage from './pages/items';
import ItemCreatePage from './pages/items-create';
import ItemEditPage from './pages/items-edit';
import BorrowItemsPage from './pages/borrow-items';
import BorrowItemCreatePage from './pages/borrow-items-create';

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
  {
    path: '/items',
    element: <ItemsPage />,
  },
  {
    path: '/items/create',
    element: <ItemCreatePage />,
  },
  {
    path: '/items/:id/edit',
    element: <ItemEditPage />,
  },
  {
    path: '/borrow-items/create',
    element: <BorrowItemCreatePage />,
  },
  {
    path: '/borrow-items',
    element: <BorrowItemsPage />,
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
