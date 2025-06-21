import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema.js';
import connectDB from './config/db.js';
import { API_URL } from './config/variable.js';

const app = express();

// Connect to MongoDB - top level await
await connectDB();

// GraphQL endpoint
app.use(`${API_URL}/graphql`, graphqlHTTP({
  schema,
  graphiql: true
}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}${API_URL}/graphql`);
});
