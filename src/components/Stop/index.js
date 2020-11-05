// @flow
import React from 'react';
import Timer from '../Timer';
import {
  Wrapper, StopDetails,
} from './styledComponent';

type Props = {
  time: String,
  stopName: String,
  isLastOfRoute?: Boolean,
  isFirstOfRoute?: Boolean,
}

function Stop(props: Props) {
  const {
    time,
    stopName,
    isLastOfRoute,
    isFirstOfRoute,
  } = props;

  const now = new Date();

  return (
    <Wrapper>
      <div>
        <StopDetails
          isLastOfRoute={isLastOfRoute}
          isFirstOfRoute={isFirstOfRoute}
        >
          <p
            className="stop-name"
          >
            {stopName}
          </p>
          {(time) && (
            <Timer
              time={time}
              now={now}
            />
          )}
        </StopDetails>
      </div>
    </Wrapper>
  );
}

Stop.defaultProps = {
  isLastOfRoute: false,
  isFirstOfRoute: false,
};

export default Stop;
