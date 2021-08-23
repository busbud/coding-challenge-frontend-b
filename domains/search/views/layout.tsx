import { ReactNode } from 'react';

type Props = {
  children: ReactNode
}

export const Layout: React.FC<Props> = ({ children }) => (
  <div>
    {children}
  </div>
);
