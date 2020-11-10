import React from 'react';
import Styled from 'react-styles-injector';

import styles from './Loader.pcss';

export interface ILoaderProps {
  className?: string;
  color?: string;
  label?: string;
  style?: React.CSSProperties;
  width?: number;
}

export const Loader = ({
  className,
  color,
  label,
  style,
  width,
}: ILoaderProps): JSX.Element => {
  return (
    <Styled styles={styles} style={style} className={className || ''}>
      <svg
        height={`${width || '40'}px`}
        viewBox="0 0 50 50"
        width={`${width || '40'}px`}
        xmlns="http://www.w3.org/2000/svg">
        <path
          fill={color || '#000'}
          d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.5s"
            repeatCount="indefinite"
          />
        </path>
      </svg>

      {label && <p style={{ ...(color && { color }) }}>{label}</p>}
    </Styled>
  );
};
