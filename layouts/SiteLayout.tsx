import BudSelect from '@/components/BudSelect';
import { useTranslation } from '@/i18n';
import { NextPage } from 'next';
import { I18nContext } from 'next-i18next';
import Head from 'next/head';
import { ChangeEvent, useContext } from 'react';

const options = ['en', 'fr'];

const SiteLayout: NextPage = ({ children }) => {
  const {
    i18n: { changeLanguage, language },
  } = useContext(I18nContext);
  const [t] = useTranslation('common');

  const onChangeOption = (ev: ChangeEvent<HTMLSelectElement>) => {
    changeLanguage(ev.target.value);
  };

  return (
    <div>
      <Head>
        <title>
          {t('Coding Challenge Busbud')}
          {' '}
          | Douglas Pires
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="bg-blue-600 antialiased">
        <div className="max-w-xl mx-auto px-8 sm:px-0">
          <nav>
            <div className="py-4 flex-shrink-0 flex items-center">
              <div className="flex-1">
                <img className="h-8 w-8" src="/images/logo.png" alt="" />
              </div>
              <div className="ml-4 flex items-center">
                <span className="mr-4 text-white">{t('Language')}</span>
                <BudSelect
                  options={options}
                  onChange={onChangeOption}
                  defaultValue={language}
                />
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default SiteLayout;
