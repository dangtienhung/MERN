import { Outlet } from 'react-router-dom';
import React from 'react';

const LayoutLogin = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Outlet />
    </div>
  );
};

export default LayoutLogin;
