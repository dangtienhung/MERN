import { Route, Routes } from 'react-router-dom';

import Home from '../pages/home';
import LayoutAdmin from '../layouts/admin';
import LayoutDefault from '../layouts/client';

// import HomeComponent from '../views';

const routerLinks = [
  {
    path: '/',
    element: <LayoutDefault />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/:id', element: 'home details' },
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
