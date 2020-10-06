import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import "./PassengerCounter.scss";
import { Button } from "react-bootstrap";

interface IPassengerCounterProps {
  label: string;
  updateCounter: UpdateCounter;
  disable: boolean;
}

type UpdateCounter = (count: number) => void;

const PassengerCounter: React.FC<IPassengerCounterProps> = ({
  label,
  updateCounter,
  disable
}) => {
  const [count, setCount] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    updateCounter(count)
  }, [count]);

  return (
    <div className="passenger-count">
      {count} {t(label).toLowerCase()}
      <div>
        <Button
          variant="light"
          onClick={() => {
            setCount(count + 1);
          }}
          disabled={disable}
        >
          +
        </Button>
        <Button
          variant="light"
          onClick={() => {
            setCount(count - 1);
          }}
          disabled={count <= 0}
        >
          -
        </Button>
      </div>
    </div>
  );
};

export default PassengerCounter;
