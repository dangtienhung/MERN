import { Route, Routes } from 'react-router-dom';

import LayoutDefault from '../layouts/LayoutDefault';
import Login from '../views/login/Login';
import ProductManager from '../views/products/ProductManager';
import ProductPreview from '../views/products/ProductPreview';
import Sidebars from '../components/Sidebars/Sidebars';

const routerLinks = [
  { key: '/admin/products', component: <ProductManager /> },
  { key: '/admin/product/add', component: <Sidebars /> },
  { key: '/admin/product/edit/:id', component: <Sidebars /> },
  { key: '/admin/product/preview/:id', component: <ProductPreview /> },
  { key: '/admin/users', component: <Sidebars /> },
  { key: '/admin/user/add', component: <Sidebars /> },
  { key: '/admin/user/edit', component: <Sidebars /> },
];

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<LayoutDefault />}>
        {routerLinks.map((item) => (
          <Route path={item.key} element={item.component} key={item.key} />
        ))}
      </Route>
      <Route path="*" element={'not found 404'} />
    </Routes>
  );
};

export default Routers;
