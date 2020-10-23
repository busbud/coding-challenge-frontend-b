import classnames from 'classnames';
import { InputHTMLAttributes } from 'react';

export type BudSelectProps = {
  options: string[];
} & InputHTMLAttributes<HTMLSelectElement>;

const BudSelect: React.FC<BudSelectProps> = ({ options, ...rest }) =>
  (
    <div className={classnames(['w-full', rest.className])}>
      <div className="relative">
        <select
          {...rest}
          className="block appearance-none w-full bg-gray-100 border border-gray-300 text-gray-700 py-3 px-3 py-2 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-600"
        >
          {options.map(option =>
            (
              <option key={option}>{option}</option>
            ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );

export default BudSelect;
