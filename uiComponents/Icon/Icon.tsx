import React from 'react';

export interface IIconProps {
  className?: string;
  height?: number;
  icon?: string;
  color?: string;
  style?: React.CSSProperties;
  width?: number;
}

export const Icon: React.FC<IIconProps> = ({
  className,
  height,
  icon,
  color,
  style,
  width,
}: IIconProps) => {
  const styles: React.CSSProperties = {
    fill: color || '#000',
    stroke: 'none',
    transition: 'fill .2s ease-out, transform .2s ease-out',
    ...style,
  };

  return (
    <svg
      className={className || ''}
      height={width || height || 24}
      style={styles}
      viewBox="0 0 24 24"
      width={width || 24}
      xmlns="http://www.w3.org/2000/svg">
      <path d={icon} />
    </svg>
  );
};
