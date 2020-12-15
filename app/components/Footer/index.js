import React from 'react';

import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';

function Footer() {
  return (
    <Wrapper>
      <section>
        <LocaleToggle />
      </section>
    </Wrapper>
  );
}

export default Footer;
