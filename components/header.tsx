import { useTranslations } from 'next-intl';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import Image from 'next/image';

import logo from 'public/osheaga-logo.png';

export const Header: React.VFC = () => {
  const t = useTranslations('Shared');

  const { locales, route, query } = useRouter();

  return (
    <div className="bg-indigo-50">
      <div className="container center max-w-screen-lg mx-auto flex justify-between flex-wrap mb-6 p-4">
        <div className="mr-2">
          <Link href="/">
            <a>
              <Image
                src={logo}
                alt="Osheaga logo"
                width={152}
                height={45}
              />
            </a>
          </Link>
        </div>
        <div className="my-auto">
          {locales && locales.map((locale, index) => (
            <span key={locale}>
              {index > 0 && (
                <span> | </span>
              )}
              <span>
                <Link
                  href={{ pathname: route, query }}
                  locale={locale}
                >
                  <a className="text-gray-700">{t('locale', { locale })}</a>
                </Link>
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
