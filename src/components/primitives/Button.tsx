import type { ReactNode, MouseEventHandler } from 'react';
import Icon from '@/icons/Icon';
import type { IconName } from '@/types';

interface ButtonProps {
  variant?: 'primary' | 'ghost' | 'link';
  href?: string;
  external?: boolean;
  icon?: IconName;
  onClick?: MouseEventHandler;
  children: ReactNode;
}

export default function Button({ variant = 'primary', href, external, icon, onClick, children }: ButtonProps) {
  const cls = `btn btn--${variant}`;
  const content = (
    <>
      {children}
      {icon ? <Icon name={icon} /> : null}
    </>
  );
  if (href) {
    return (
      <a
        className={cls}
        href={href}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <button className={cls} type="button" onClick={onClick}>
      {content}
    </button>
  );
}
