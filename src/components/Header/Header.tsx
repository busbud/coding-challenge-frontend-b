import Link from 'next/link'
import styled from 'styled-components'
import Logo from '../Logo/Logo'
import LanguageSelect from '../LanguageSelect/LanguageSelect'

const StyledLogo = styled(Logo)`
  height: 40px;
`

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: ${(props) => props.theme.padding} 0;
`

const Header = () => {
  return (
    <StyledHeader>
      <Link href="/">
        <a title="Go to Home">
          <StyledLogo />
        </a>
      </Link>
      <LanguageSelect />
    </StyledHeader>
  )
}

export default Header
