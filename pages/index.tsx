import { FC } from 'react'
import styled from 'styled-components'
import DestinationList from '../components/DestinationList/DestinationList'
import HtmlHead from '../components/Head/Head'
import SearchBox from '../components/SearchBox/SearchBox'

const Container = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: column;
`

const Home: FC = () => (
  <Container>
    <HtmlHead />
    <SearchBox />
    <DestinationList />
  </Container>
)

export default Home
