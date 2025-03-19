import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { gql } from 'graphql-tag'

const typeDefs = gql`
  type Doctor {
    name: String
    speciality: Speciality
  }

  type Query {
   doctors: [Doctor]
 }
 
  enum Speciality {
    PSYCHOLOGIST
    OPHTALMOLOGIST
  }
`;

const doctorsData = [
  {
    name: 'Samia Mekame',
    speciality: 'OPHTALMOLOGIST',
  },
  {
    name: 'Catherine Bedoy',
    speciality: 'PSYCHOLOGIST',
  },
];

const server = new ApolloServer({
  typeDefs,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);