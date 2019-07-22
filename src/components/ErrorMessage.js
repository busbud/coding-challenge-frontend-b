import React from 'react';
import { withNamespaces } from 'react-i18next';

@withNamespaces()
export default class ErrorMessage extends React.Component {
  render() {
    const { text, t } = this.props;
    return <div className="error-page-container">{t(`${text}`)}</div>;
  }
}
