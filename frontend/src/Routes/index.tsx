import { Route, Routes } from 'react-router-dom';

import Details from '../pages/details/Details';
import Home from '../pages/home';
import LayoutAdmin from '../layouts/admin';
import LayoutDefault from '../layouts/client';
import LayoutLogin from '../layouts/client/LayoutLogin';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/Register';

const routerLinks = [
  {
    element: <LayoutLogin />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },
  {
    path: '/',
    element: <LayoutDefault />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/:id', element: <Details /> },
    ],
  },
  {
    path: '/admin',
    element: <LayoutAdmin />,
    chilren: [
      { path: '/dashboard', element: 'dashboard' },
      { path: '/mobile', element: 'mobile phone' },
      { path: '/mobile/add', element: 'mobile phone add' },
      { path: '/mobile/edit/:id', element: 'mobile phone edit' },
    ],
  },
  { path: '*', element: 'not found 404' },
];

const Routers = () => {
  return (
    <Routes>
      {routerLinks.map((link, index) => (
        <Route key={index} path={link.path} element={link.element}>
          {link.children &&
            link.children.length > 0 &&
            link.children.map((child, index) => (
              <Route key={index} path={child.path} element={child.element} />
            ))}
        </Route>
      ))}
    </Routes>
  );
};

export default Routers;
