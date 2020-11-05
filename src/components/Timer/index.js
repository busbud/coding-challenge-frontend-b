// @flow
import React, { useState, useEffect } from 'react';
import { TimerWrapper } from './styledComponent';
import { dateToHHmm } from '../../utils/date';

type Props = {
  time: string,
}

function Timer(props: Props) {
  const {
    time,
  } = props;

  const [timerContent, setTimerContent] = useState('');


  useEffect(() => {
    setTimerContent(dateToHHmm(time));
  }, [time]);

  return (
    <TimerWrapper>
      <p>
        {timerContent}
      </p>
    </TimerWrapper>
  );
}

export default Timer;
