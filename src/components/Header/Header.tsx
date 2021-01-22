import Link from 'next/link'

import Logo from 'components/Logo/Logo'

import style from './Header.module.scss'

const Header = () => {
  return (
    <header className={style.header}>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
    </header>
  )
}

export default Header
