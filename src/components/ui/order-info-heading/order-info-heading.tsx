import React, { FC } from 'react';
import { OrderInfoHeadingUIProps } from './type';

export const OrderInfoHeadingUI: FC<OrderInfoHeadingUIProps> = ({
  children
}) => <h3 className='text text_type_digits-default'>{children}</h3>;
