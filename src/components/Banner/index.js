import React, { useState } from 'react';
import { BannerWrapper } from './styledComponent';
// import { ReactComponent as CloseIcon } from '../../assets/images/cross-icon.svg';

type Props = {
    title: String, // eslint-disable-line
    content: String, // eslint-disable-line
    closable?: Boolean, //eslint-disable-line
    onCloseClick?: Function,
}

function Banner({
  title,
  content,
  closable,
  onCloseClick,
}: Props) {
  const [showBanner, setShowBanner] = useState(true);
  return (
    <>
      {showBanner && (
        <BannerWrapper>
          {(title || content) && (
          <div>
            {title && (
            <h4>
              {title}
            </h4>
            )}
            {content && (
            <p>
              {content}
            </p>
            )}
          </div>
          )}
          {(closable) && (
            <button
              type="button"
              onClick={(e) => { onCloseClick(e); setShowBanner(false); }}
            >
              close
              {/* <CloseIcon /> */}
            </button>
          )}
        </BannerWrapper>
      )}
    </>
  );
}

Banner.defaultProps = {
  onCloseClick: () => { },
};

export default Banner;
