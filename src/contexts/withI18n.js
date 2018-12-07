import React from 'react';
import { I18nConsumer as Consumer} from './I18nContext';

export default Cmp => props => (
    <Consumer>{i18n => <Cmp {...props} i18n={i18n} />}</Consumer>
  );
  