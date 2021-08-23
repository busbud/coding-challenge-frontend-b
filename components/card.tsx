import { ReactNode } from 'react';

type Props = {
  children: ReactNode
}

export const Card: React.FC<Props> = ({ children }) => (
  <div style={{ border: '1px solid gray', padding: '8px', borderRadius: '3px' }}>
    {children}
  </div>
);
