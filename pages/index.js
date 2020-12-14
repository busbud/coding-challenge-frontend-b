import Container from "../components/container";
import Head from "next/head";
import Table from "../components/table";
import Hero from "../components/hero";

function Index() {
  return (
    <div>
      <Head>
        <title>Busbud Challenge - Home</title>
      </Head>
      <Container>
        <Hero />
        <Table />
      </Container>
    </div>
  );
}

export default Index;
