import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { gql } from 'apollo-boost';
import { GET_QUEUED_SONGS } from './queries';

const client = new ApolloClient({
  link: new WebSocketLink({
    uri: 'wss://music-app.hasura.app/v1/graphql',
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          'x-hasura-admin-secret':
            'zM7btIsvAl57Eah7lZoXA4lX0HxX5bH6hqQ68lqTlAlTdkTwrFiVOCQxrc6iwqk5',
        },
      },
    },
  }),
  cache: new InMemoryCache(),
  typeDefs: gql`
    type Song {
      id: uuid!
      title: String!
      artist: String!
      thumbnail: String!
      url: String!
      duration: Float!
    }

    input SongInput {
      id: uuid!
      title: String!
      artist: String!
      thumbnail: String!
      url: String!
      duration: Float!
    }

    type Query {
      queue: [Song]!
    }

    type Mutation {
      addOrRemoveFromQueue(input: SongInput!): [Song]!
    }
  `,
  resolvers: {
    Mutation: {
      addOrRemoveFromQueue: (_, { input }, { cache }) => {
        const queryResult = cache.readQuery({
          query: GET_QUEUED_SONGS,
        });

        if (queryResult) {
          const { queue } = queryResult;
          const isInQueue = queue.some((song) => song.id === input.id);
          const newQueue = isInQueue
            ? queue.filter((song) => song.id !== input.id)
            : [...queue, input];

          cache.writeData({
            query: GET_QUEUED_SONGS,
            data: { queue: newQueue },
          });

          return newQueue;
        }

        return [];
      },
    },
  },
});

const data = {
  queue: localStorage.getItem('songs')
    ? JSON.parse(localStorage.getItem('songs'))
    : [],
};

client.writeData({ data });

export default client;
