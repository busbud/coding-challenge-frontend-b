import { useTranslations } from 'next-intl';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import Image from 'next/image';

import logo from 'public/osheaga-logo.png';

export const Header: React.VFC = () => {
  const t = useTranslations('Header');

  const { locales, route, query } = useRouter();

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', gap: 10 }}>
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
      <div>
        {locales && locales.map((locale) => (
          <div key={locale}>
            <Link
              href={{ pathname: route, query }}
              locale={locale}
            >
              {t('locale', { locale })}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
