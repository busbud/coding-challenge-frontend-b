import { useTranslations } from 'next-intl';

import { Card } from 'components';
import { Item } from 'domains/departure';

import { useSearch } from '../context';

export const List: React.VFC = () => {
  const t = useTranslations('Search');
  const { departures, isLoading } = useSearch();

  return (
    <>
      <div className="container mx-auto max-w-screen-lg">
        <p className="mb-4 text-lg text-gray-400">{t('description')}</p>
        {departures.length === 0 && !isLoading && (
          <Card>
            <p className="text-gray-400 font-bold">{t('emptyStateTitle')}</p>
            <p className="text-gray-400">{t('emptyStateDescription')}</p>
          </Card>
        )}
        {departures.length > 0 && departures.map((departure) => (
          <div key={departure.id} className="mb-4" data-cy="departure-item">
            <Card>
              <Item departure={departure} />
            </Card>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-center text-gray-400" data-cy="search-loading">
            {t('loadingStateDescription')}
          </div>
        )}
      </div>
    </>
  );
};
