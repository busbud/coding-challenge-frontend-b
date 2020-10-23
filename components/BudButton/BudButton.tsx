import { ButtonHTMLAttributes } from 'react';
import classnames from 'classnames';

export type BudButtonProps = {
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const BudButton: React.FC<BudButtonProps> = ({
  children,
  size = 'md',
  loading,
  ...rest
}) => {
  const sizeClasses = {
    sm: 'py-1 px-2',
    md: 'py-4 px-6',
    lg: 'py-4 px-6',
  };
  const classes = classnames([
    'inline-block bg-gray-900 transition duration-200 ease-out hover:bg-gray-800 text-white font-medium rounded-lg leading-tight flex m-auto w-full sm:w-auto justify-center',
    sizeClasses[size],
  ]);
  return (
    <button type="button" className={classes} {...rest} disabled={loading}>
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default BudButton;
