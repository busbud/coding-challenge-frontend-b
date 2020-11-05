import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BannerWrapper, ContentWrapper } from './styledComponent';

type Props = {
    title: String, // eslint-disable-line
    content: String, // eslint-disable-line
    closable?: Boolean,
    onCloseClick?: Function,
    type: String,
    linkContent?: String, //eslint-disable-line
    linkTo?: String, //eslint-disable-line
    fixedTo?: 'bottom' | 'top', //eslint-disable-line
    textAlign?: 'center' | 'left' | 'right', //eslint-disable-line
}

function Banner({
  title,
  content,
  closable,
  onCloseClick,
  type,
  linkContent,
  linkTo,
  fixedTo,
  textAlign,
}: Props) {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <>
      {showBanner && (
        <BannerWrapper
          type={type}
          fixedTo={fixedTo}
          textAlign={textAlign}
        >
          {(title || content) && (
            <ContentWrapper type={type}>
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
            </ContentWrapper>
          )}
          {(closable || (linkTo && linkContent)) && (
            <div style={{ display: 'flex' }}>
              {(linkTo && linkContent) && (
                <Link to={linkTo}>
                  {linkContent}
                </Link>
              )}
              {closable && (
                <button
                  type="button"
                  onClick={(e) => { onCloseClick(e); setShowBanner(false); }}
                >
                  close
                </button>
              )}
            </div>
          )}
        </BannerWrapper>
      )}
    </>
  );
}

Banner.defaultProps = {
  onCloseClick: () => { },
  closable: false,
  textAlign: 'left',
};

export default Banner;
