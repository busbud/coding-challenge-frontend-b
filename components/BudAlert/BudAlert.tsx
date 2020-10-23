import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import fromRight from '@/styles/transitions/fromRight.module.scss';
import { createPortal } from 'react-dom';

type BudAlertProps = {
  title?: string;
  visible?: boolean;
  timeout?: number;
  onTimeout: () => void;
};

const BudAlert: React.FC<BudAlertProps> = ({
  children,
  title,
  onTimeout,
  timeout = 5000,
  visible,
}) => {
  const ref = useRef<any>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector('#__next');
    setMounted(true);
  }, []);

  useEffect(() => {
    const timeoutListener = setTimeout(() => {
      onTimeout();
    }, timeout);
    return () => {
      clearTimeout(timeoutListener);
    };
  });

  return (
    (mounted
      && createPortal(
        <CSSTransition
          in={visible}
          timeout={200}
          unmountOnExit
          classNames={fromRight}
        >
          <div
            className="absolute right-0 top-0 mt-4 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
            role="alert"
          >
            <p className="font-bold">{title}</p>
            <p>{children}</p>
          </div>
        </CSSTransition>,
        ref.current
      )) || <></>
  );
};

export default BudAlert;
