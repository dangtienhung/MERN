import { Layout } from 'antd';
import LayoutContent from './content';
import LayoutFooter from './footer';
import LayoutHeader from './header';

const LayoutDefault = () => {
  return (
    <Layout>
      <LayoutHeader />
      <LayoutContent />
      <LayoutFooter />
    </Layout>
  );
};

export default LayoutDefault;
