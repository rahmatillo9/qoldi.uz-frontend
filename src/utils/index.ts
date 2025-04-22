import { twMerge } from 'tailwind-merge';
import { ClassValue, clsx } from 'clsx';

import { BadgeProps } from '@/ui/components/badge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitialName(name?: string) {
  return name ? name[0].toUpperCase() : '?';
}

export function getRoleColor(role: string): BadgeProps['color'] {
  switch (role.toLowerCase()) {
    case 'host':
      return 'green';
    case 'speaker':
      return 'yellow';
    case 'moderator':
      return 'purple';
    case 'producer':
      return 'blue';
    default:
      return 'primary';
  }
  
}
