import { InputHTMLAttributes } from 'react';

type BudInputProps = InputHTMLAttributes<HTMLInputElement>;

const BudInput: React.FC<BudInputProps> = ({ className, ...rest }) =>
  (
    <div className={className}>
      <input
        {...rest}
        className="block w-full border border-gray-300 rounded-lg bg-gray-100 px-3 py-2 leading-tight focus:outline-none focus:border-gray-600 focus:bg-white h-full"
      />
    </div>
  );

export default BudInput;
