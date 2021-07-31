interface SpinnerProps {
  size?: string;
  position?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ position, size }) => {
  const modifierPosition = position ? `spinner-${position}` : "";
  const modifierSize = size ? `spinner-${size}` : "";

  return <div className={`spinner ${modifierPosition} ${modifierSize}`}></div>;
};

export default Spinner;
