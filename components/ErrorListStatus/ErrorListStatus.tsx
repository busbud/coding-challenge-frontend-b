import { FC } from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import { colors, fontSize } from '../../styles/theme'
import { Container, Text } from './styles'

const ErrorListStatus: FC = () => (
  <Container>
    <Text>Ups, something does wrong, try again later</Text>
    <FiAlertCircle color={colors.danger} fontSize={fontSize.xlg} />
  </Container>
)

export default ErrorListStatus
