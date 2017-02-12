import React from 'react';
import { translate } from 'react-i18next';

import { Option } from './Option';

function FiltersI18n(props) {
  const { t } = props;

  return (
    <div>
      <div className="o-layout">
        <div className="o-layout__item u-margin-bottom u-1-1 u-m-2-4">
          <h3>{t('filters.sort.title')}</h3>

          <Option
            options={[{
              value: 'departure_time/ASC',
              name: t('filters.sort.departure_time'),
            }, {
              value: 'arrival_time/ASC',
              name: t('filters.sort.arrival_time'),
            }, {
              value: 'prices.total/ASC',
              name: t('filters.sort.price_asc'),
            }, {
              value: 'prices.total/DESC',
              name: t('filters.sort.price_desc'),
            }]}
            value={props.sort}
            onChange={value => props.onChangeSort(value)}
            type="radio"
          />
        </div>
        <div className="o-layout__item u-margin-bottom u-m-2-4">
          <h3>{t('filters.options.title')}</h3>

          <div className="u-margin-bottom">
            <div className="o-label">{t('filters.options.lang')}</div>

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
            <div className="o-label">{t('filters.options.currency')}</div>

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

FiltersI18n.propTypes = {
  sort: React.PropTypes.string.isRequired,
  lang: React.PropTypes.string.isRequired,
  currency: React.PropTypes.string.isRequired,
  onChangeSort: React.PropTypes.func.isRequired,
  onChangeLang: React.PropTypes.func.isRequired,
  onChangeCurrency: React.PropTypes.func.isRequired,
};

export const Filters = translate(['translation'], { wait: true })(FiltersI18n);
