import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';

import { Header } from 'components';

const NotFoundPage: React.VFC = () => {
  const t = useTranslations('Shared');

  return (
    <div>
      <Header />
      <div className="container mx-auto max-w-screen-lg">
        <p className="text-gray-400 font-bold">{t('errorTitle')}</p>
        <p className="text-gray-400">{t('errorDescription')}</p>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  const messages = {
    ...require(`messages/shared/${locale}.json`),
  };

  return {
    props: {
      locale,
      messages,
    },
  };
};

export default NotFoundPage;
