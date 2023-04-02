import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const LayoutContent = () => {
  return (
    <Layout.Content style={{ padding: '0 50px' }} className="!flex-1">
      <Outlet />
    </Layout.Content>
  );
};

export default LayoutContent;
