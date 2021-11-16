import { FC } from 'react'
import { FiMap } from 'react-icons/fi'
import { colors, fontSize } from '../../styles/theme'
import { Container, Text } from './styles'

const InitialListStatus: FC = () => (
  <Container>
    <Text>Do a search!</Text>
    <FiMap color={colors.main} fontSize={fontSize.xlg} />
  </Container>
)

export default InitialListStatus
