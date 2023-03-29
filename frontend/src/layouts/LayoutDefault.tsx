import { Outlet } from 'react-router-dom';
import Sidebars from '../components/Sidebars/Sidebars';

const LayoutDefault = () => {
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
