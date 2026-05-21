import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router';
import MenuLayout from './layout/MenuLayout/MenuLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Products from './pages/Products/Products';
import Favorites from './pages/Favorites/Favorites';
import { Test } from './pages/Test/Test';
import InboxLayout from './layout/InboxLayout/InboxLayout';
import NotFound from './pages/NotFound/NotFound';
import { ThemeProvider } from './context/ThemeContext';
import InboxAll from './pages/Inbox/All/InboxAll';
import InboxStarred from './pages/Inbox/Starred/InboxStarred';
import OrderList from './pages/OrderList/OrderList';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MenuLayout></MenuLayout>,
      children: [
        {
          index: true,
          element: <Dashboard></Dashboard>,
        },
        {
          path: '/products',
          element: <Products></Products>,
        },
        {
          path: '/favorites',
          element: <Favorites></Favorites>,
        },
        {
          path: '/inbox',
          element: <InboxLayout></InboxLayout>,
          children: [
            {
              index: true,
              element: <InboxAll></InboxAll>,
            },
            {
              path: 'starred',
              element: <InboxStarred></InboxStarred>,
            },
            {
              path: 'spam',
              element: <>spam</>,
            },
          ],
        },
        {
          path: '/order-list',
          element: <OrderList></OrderList>,
        },
        {
          path: '/test',
          element: <Test></Test>,
        },
      ],
    },
    {
      path: '*',
      element: <NotFound></NotFound>,
    },
  ],
  { basename: import.meta.env.BASE_URL },
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  </StrictMode>,
);
