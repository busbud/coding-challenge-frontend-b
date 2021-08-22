type Props = {
  title: string
}

export const Card: React.FC<Props> = ({ title, children }) => (
  <div>
    Card
    {' '}
    {title}
    <div>{children}</div>
  </div>
);
