import React from 'react';

import { cn } from '@/utils';

export interface SvgProp extends React.SVGAttributes<SVGElement> {
  className?: string;
  children?: React.ReactNode;
}

const Svg: React.FC<SvgProp> = ({ className, children, ...props }) => {
  return (
    <svg className={cn('shrink-0', className)} xmlns="http://www.w3.org/2000/svg" {...props}>
      {children}
    </svg>
  );
};

export default Svg;
