import { ProductsAdd, ProductsManager } from '../pages/admin/products';
import { Route, Routes } from 'react-router-dom';

import CartPage from '../pages/cart';
import Dashboard from '../pages/admin/dashboard';
import Details from '../pages/details/Details';
import Home from '../pages/home';
import LayoutAdmin from '../layouts/admin';
import LayoutDefault from '../layouts/client';
import LayoutLogin from '../layouts/client/LayoutLogin';
import LoginAdmin from '../pages/login/LoginAdmin';
import LoginPage from '../pages/login';
import ManageEdit from '../pages/admin/categories/ManageEdit';
import ManagerBrands from '../pages/admin/brands';
import ManagerCategories from '../pages/admin/categories';
import ManagerEdit from '../pages/admin/brands/ManagerEdit';
import NotFound from '../pages/404/NotFound';
import RegisterPage from '../pages/Register';
import Specification from '../pages/admin/specification/Specification';
import SpecificationAdd from '../pages/admin/specification/SpecificationAdd';
import SpecificationEdit from '../pages/admin/specification/SpecificationEdit';

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
      { path: '/cart', element: <CartPage /> },
    ],
  },
  {
    element: <LayoutAdmin />,
    children: [
      { path: '/admin/dashboard', element: <Dashboard /> },
      { path: '/admin/managers-brands', element: <ManagerBrands /> },
      { path: '/admin/managers-brands/:id', element: <ManagerEdit /> },
      { path: '/admin/managers-categories', element: <ManagerCategories /> },
      { path: '/admin/managers-categories/:id', element: <ManageEdit /> },
      { path: '/admin/manager-specifications', element: <Specification /> },
      { path: '/admin/manager-specifications/add', element: <SpecificationAdd /> },
      { path: '/admin/manager-specifications/edit/:id', element: <SpecificationEdit /> },
      { path: '/admin/mobile', element: <ProductsManager /> },
      { path: '/admin/mobile/add', element: <ProductsAdd /> },
      { path: '/admin/mobile/edit/:id', element: 'mobile phone edit' },
    ],
  },
  { path: '*', element: <NotFound /> },
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
