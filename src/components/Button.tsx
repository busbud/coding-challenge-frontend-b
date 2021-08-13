const Button = ({
  className = 'button',
  defaultText = 'Click me',
  disabled = false,
  onClick = () => {},
  dataTestId = '',
}: Props) => {
  return (
    <button
      className={`${className} ${disabled ? 'button__disabled' : ''}`}
      disabled={disabled}
      onClick={onClick}
      type="button"
      data-testid={dataTestId}
    >
      {defaultText}
    </button>
  );
};

export default Button;

interface Props {
  className?: string;
  disabled?: boolean;
  defaultText: string;
  onClick: () => void;
  dataTestId: string;
}
