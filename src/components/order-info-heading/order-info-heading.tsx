import { useParams } from 'react-router-dom';
import { OrderInfoHeadingUI } from '../ui/order-info-heading/order-info-heading';

export const OrderInfoHeading = () => {
  const { number } = useParams();

  return <OrderInfoHeadingUI>#{number}</OrderInfoHeadingUI>;
};
