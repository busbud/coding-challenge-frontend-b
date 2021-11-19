import Layout from '../components/Layout';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';
import LoadingBar from '../components/LoadingBar';
import ErrorMessage from '../components/ErrorMessage';

const IndexPage = () => (
    <Layout title="Home | Search for bus departures">
        <h1>Busbud 👋</h1>
        <SearchForm />
        <LoadingBar />
        <SearchResults />
        <ErrorMessage />
    </Layout>
)

export default IndexPage
