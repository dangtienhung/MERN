import { Drawer } from 'antd';

interface ICartDrawerProps {
  onClose: () => void;
  open: boolean;
}

const CartDrawer = ({ onClose, open }: ICartDrawerProps) => {
  return (
    <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};

export default CartDrawer;
