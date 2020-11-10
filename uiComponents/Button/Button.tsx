import React from 'react';
import Styled from 'react-styles-injector';
import Link from 'next/link';

import { Icon } from '@uiComponents/Icon';
import buttonStyles from './Button.pcss';
import { Loader } from '@uiComponents/Loader';
import { EAppColors } from '@uiAssets/colors';

export interface IProps {
  readonly background?: string;
  readonly className?: string;
  readonly color?: string;
  readonly disabled?: boolean;
  readonly href?: string;
  readonly iconColor?: string;
  readonly iconLeft?: string;
  readonly iconRight?: string;
  readonly id?: string;
  readonly isLoading?: boolean;
  readonly label?: string | Array<string>;
  readonly name?: string;
  readonly onClick?: (event: React.MouseEvent) => void;
  readonly onMouseDown?: (event: React.MouseEvent) => void;
  readonly onMouseOver?: (event: React.MouseEvent) => void;
  readonly onMouseUp?: (event: React.MouseEvent) => void;
  readonly outerHref?: string;
  readonly rel?: string;
  readonly role?: string;
  readonly secondary?: boolean;
  readonly size?: 'small' | 'big';
  readonly styles?: React.CSSProperties;
  readonly target?: string;
  readonly type?: string;
  readonly width?: number;
}

export const Button = ({
  background,
  className,
  color = EAppColors.MAIN,
  disabled,
  href,
  iconColor,
  iconLeft,
  iconRight,
  id,
  isLoading,
  label,
  name,
  onClick,
  onMouseDown,
  onMouseOver,
  onMouseUp,
  outerHref,
  rel,
  role,
  secondary,
  size,
  styles,
  target,
  type,
  width,
}: IProps): JSX.Element => {
  let finalColor = color;
  if (secondary) {
    finalColor = '#fff';
    if (background) {
      finalColor = background;
    }
  }

  const content: JSX.Element = (
    <span>
      {iconLeft && (
        <Icon
          icon={iconLeft}
          color={iconColor || finalColor}
          width={
            {
              big: 24,
              small: 14,
              default: 18,
            }[size || 'default']
          }
          className={` ${size || 'normal'} ${label ? 'marginRight' : ''}`}
        />
      )}
      <span>{label || ''}</span>
      {iconRight && (
        <Icon
          icon={iconRight}
          color={iconColor || finalColor}
          width={
            {
              big: 24,
              small: 14,
              default: 18,
            }[size || 'default']
          }
          className={` ${size || 'normal'} ${label ? 'marginLeft' : ''}`}
        />
      )}
    </span>
  );

  const stylesToInline = {
    ...styles,
    ...(background && {
      background,
      border: `2px solid ${background}`,
      boxShadow: `#fff 2px 2px 0, ${background} 5px 5px 0`,
    }),
    ...(background && secondary && { color: background }),
    ...{ color: finalColor },
    ...(width && { width }),
  };

  const button = (
    <Styled
      styles={buttonStyles}
      tag={href || outerHref ? 'a' : 'button'}
      role={role || undefined}
      href={outerHref || href || null}
      rel={target && target === '_blank' ? 'noopener noreferrer' : rel || null}
      target={target || null}
      id={id || null}
      className={`link ${className || ''} ${size || 'normal'} ${
        disabled ? 'disabled' : ''
      } ${isLoading ? 'isLoading' : ''} ${secondary ? 'secondary' : ''}`}
      type={href || outerHref ? null : type || 'button'}
      name={name || null}
      disabled={disabled || null}
      onClick={!disabled && !isLoading ? onClick : null}
      onMouseDown={!disabled && !isLoading ? onMouseDown : null}
      onMouseUp={!disabled && !isLoading ? onMouseUp : null}
      onMouseOver={!disabled && !isLoading ? onMouseOver : null}
      style={stylesToInline || null}>
      {isLoading ? (
        <Loader color={finalColor} width={size === 'small' ? 16 : 20} />
      ) : (
        content
      )}
    </Styled>
  );

  if (href) {
    return <Link href={href}>{button}</Link>;
  }

  return button;
};
