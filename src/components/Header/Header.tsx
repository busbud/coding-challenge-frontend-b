import Link from 'next/link'
import styled from 'styled-components'
import { Box } from 'grommet'

import Logo from '../Logo/Logo'
import LanguageSelect from '../LanguageSelect/LanguageSelect'
import CurrencySelect from '../CurrencySelect/CurrencySelect'

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
      <Box direction="row" gap="small">
        <LanguageSelect />
        <CurrencySelect />
      </Box>
    </StyledHeader>
  )
}

export default Header
