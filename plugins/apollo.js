import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export default ctx => {
  const httpLink = new HttpLink({ uri: process.env.HTTP_URI });

  const token = () => {
    return process.server
      ? ctx.req.session
      : localStorage.getItem('ADMIN_TOKEN') || null;
  };

  const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: { authorization: `Bearer ${token()}` },
    });
    return forward(operation);
  });

  const link = middlewareLink.concat(httpLink);

  return {
    link,
    cache: new InMemoryCache(),
  };
};
