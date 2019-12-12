const { ApolloServer, gql } = require("apollo-server");
const { BusbudAPI } = require("./BusbudAPI");

const typeDefs = gql`
  type Query {
    departures(from: String!, to: String!, when: String!): [Departure]
  }

  type Departure {
    departure_time: String
    arrival_time: String
    location: String
    price: Float
  }
`;

const resolvers = {
  Query: {
    departures: (_, { from, to, when }, { dataSources }) =>
      dataSources.busbudAPI.getDepartures({ from, to, when })
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      busbudAPI: new BusbudAPI()
    };
  },
  context: () => {
    return {
      token: "PARTNER_AHm3M6clSAOoyJg4KyCg7w"
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
