import { Route, Routes } from 'react-router-dom';

import Dashboard from '../pages/admin/dashboard';
import Details from '../pages/details/Details';
import Home from '../pages/home';
import LayoutAdmin from '../layouts/admin';
import LayoutDefault from '../layouts/client';
import LayoutLogin from '../layouts/client/LayoutLogin';
import LoginAdmin from '../pages/login/LoginAdmin';
import LoginPage from '../pages/login';
import Products from '../pages/admin/products';
import RegisterPage from '../pages/Register';

const routerLinks = [
  {
    element: <LayoutLogin />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/admin/login', element: <LoginAdmin /> },
    ],
  },
  {
    element: <LayoutDefault />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/:id', element: <Details /> },
    ],
  },
  {
    element: <LayoutAdmin />,
    children: [
      { path: '/admin/dashboard', element: <Dashboard /> },
      { path: '/admin/mobile', element: 'mobile phone' },
      { path: '/admin/mobile/add', element: <Products /> },
      { path: '/admin/mobile/edit/:id', element: 'mobile phone edit' },
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
