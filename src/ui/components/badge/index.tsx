import React from 'react';
import { tv } from 'tailwind-variants';

import { cn } from '@/utils';

export interface BadgeProps {
  label: string;
  icon?: React.ReactNode;
  color?: 'primary' | 'green' | 'yellow' | 'blue' | 'purple' | 'darkgreen' | 'secondary';
  size?: 'xs';
  iconOnly?: boolean;
  rounded?: 'default' | 'full';
  className?: string;
}

const badgeStyles = tv({
  slots: {
    wrapper:
      'cursor-pinter inline-flex flex-nowrap items-center justify-center gap-2 text-nowrap rounded-full px-3 py-1 !text-caption-md',
    icon: '',
  },
  variants: {
    color: {
      primary: { wrapper: 'bg-primary text-white', icon: 'text-primary-50' },
      green: { wrapper: 'bg-green-10/20 text-green-10', icon: 'text-green-50' },
      yellow: { wrapper: 'bg-yellow-300/20 text-yellow-300', icon: 'text-yellow-50' },
      blue: { wrapper: 'bg-blue-100/20 text-blue-100', icon: 'text-blue-50' },
      purple: { wrapper: 'bg-purple-300/20 text-purple-300', icon: 'text-purple-50' },
      darkgreen: { wrapper: 'bg-[#1ABC72] font-medium text-black', icon: 'text-black' },
      secondary: { wrapper: 'bg-gray/10' },
    },
    size: {
      xs: { wrapper: 'rounded-lg px-2 py-1', icon: '' },
      xxs: { wrapper: 'rounded-lg px-2 py-1 text-caption-xs', icon: '' },
    },
    rounded: {
      default: { wrapper: 'rounded-lg' },
      full: { wrapper: 'rounded-full' },
    },
    iconOnly: { true: '', false: '' },
  },
  compoundVariants: [
    {
      iconOnly: true,
      size: 'xs',
      class: { wrapper: 'px-1 py-1' },
      rounded: 'default',
    },
  ],
  defaultVariants: {
    color: 'primary',
    size: 'xs',
    rounded: 'default',
  },
});

const Badge: React.FC<BadgeProps> = ({
  label,
  icon: iconComponent,
  iconOnly,
  color,
  size,
  rounded = 'default',
  className,
  ...props
}) => {
  const { wrapper, icon } = badgeStyles({ color, iconOnly, size, rounded });

  return (
    <div className={cn(wrapper(), className)} {...props}>
      {iconComponent && <span className={cn(icon())}>{iconComponent}</span>}
      {!iconOnly && label && <span>{label}</span>}
    </div>
  );
};

export default Badge;
