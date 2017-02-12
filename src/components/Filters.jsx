import React from 'react';

import { Option } from './Option';

export function Filters(props) {
  return (
    <div>
      <div className="o-layout">
        <div className="o-layout__item u-margin-bottom u-1-1 u-m-2-4">
          <h3>Trier les résultats</h3>

          <Option
            options={[{
              value: 'departure_time/ASC',
              name: 'Heure de départ',
            }, {
              value: 'arrival_time/ASC',
              name: 'Heure d\'arrivée',
            }, {
              value: 'prices.total/ASC',
              name: 'Du moins cher au plus cher',
            }, {
              value: 'prices.total/DESC',
              name: 'Du plus cher au moins cher',
            }]}
            value={props.order}
            onChange={value => props.onChangeOrder(value)}
            type="radio"
          />
        </div>
        <div className="o-layout__item u-margin-bottom u-m-2-4">
          <h3>Options</h3>

          <div className="u-margin-bottom">
            <div className="o-label">Langue :</div>

            <Option
              options={[{
                value: 'en',
                name: 'English',
              }, {
                value: 'fr',
                name: 'Français',
              }]}
              value={props.lang}
              onChange={value => props.onChangeLang(value)}
            />
          </div>

          <div className="u-margin-bottom">
            <div className="o-label">Devise :</div>

            <Option
              options={[{
                value: 'CAD',
                name: '$',
              }, {
                value: 'EUR',
                name: '€',
              }]}
              value={props.currency}
              onChange={value => props.onChangeCurrency(value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

Filters.propTypes = {
  order: React.PropTypes.string.isRequired,
  lang: React.PropTypes.string.isRequired,
  currency: React.PropTypes.string.isRequired,
  onChangeOrder: React.PropTypes.func.isRequired,
  onChangeLang: React.PropTypes.func.isRequired,
  onChangeCurrency: React.PropTypes.func.isRequired,
};
