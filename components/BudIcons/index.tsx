import { HTMLAttributes } from 'react';

const HourGlassIcon: React.FC<HTMLAttributes<SVGElement>> = props =>
  (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M3 18a7 7 0 0 1 4-6.33V8.33A7 7 0 0 1 3 2H1V0h18v2h-2a7 7 0 0 1-4 6.33v3.34A7 7 0 0 1 17 18h2v2H1v-2h2zM5 2a5 5 0 0 0 4 4.9V10h2V6.9A5 5 0 0 0 15 2H5z" />
    </svg>
  );

const CloseIcon: React.FC<HTMLAttributes<SVGElement>> = props =>
  (
    <svg
      {...props}
      className="w-3 fill-current text-red-700"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
    </svg>
  );

const CheckMarkIcon: React.FC<HTMLAttributes<SVGElement>> = props =>
  (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
    </svg>
  );

const LocationCurrentIcon: React.FC<HTMLAttributes<SVGElement>> = props =>
  (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M0 0l20 8-8 4-2 8z" />
    </svg>
  );

const NavigationMoreIcon: React.FC<HTMLAttributes<SVGElement>> = props =>
  (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M4 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm6 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm6 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
    </svg>
  );

const LocationIcon: React.FC<HTMLAttributes<SVGElement>> = props =>
  (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M10 20S3 10.87 3 7a7 7 0 1 1 14 0c0 3.87-7 13-7 13zm0-11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    </svg>
  );

export {
  HourGlassIcon,
  LocationIcon,
  NavigationMoreIcon,
  CheckMarkIcon,
  CloseIcon,
  LocationCurrentIcon,
};
