import { Outlet, useNavigate } from 'react-router-dom';

import { IUserInfo } from '../interfaces/UserInfo';
import Sidebars from '../components/Sidebars/Sidebars';
import { useState } from 'react';

const LayoutDefault = () => {
  const navigate = useNavigate();
  const [userInfo] = useState<IUserInfo>(JSON.parse(localStorage.getItem('userInfo')!));
  if (!userInfo || userInfo === null) {
    navigate('/');
  }
  return (
    <div className="flex">
      <Sidebars />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutDefault;
