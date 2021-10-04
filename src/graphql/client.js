import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://music-app.hasura.app/v1/graphql',
  headers: {
    'x-hasura-admin-secret':
      'zM7btIsvAl57Eah7lZoXA4lX0HxX5bH6hqQ68lqTlAlTdkTwrFiVOCQxrc6iwqk5',
  },
});

export default client;
