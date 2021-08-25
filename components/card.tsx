import { ReactNode } from 'react';

type Props = {
  children: ReactNode
}

export const Card: React.FC<Props> = ({ children }) => (
  <div className="border rounded-xl shadow p-4">
    {children}
  </div>
);
