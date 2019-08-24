### Hacker News Clone

This is a project from `howtographql` that walks you through how to set up a graphql project.

#### Dependencies:

**graphql-yoga** is a fully-featured GraphQL server. It is based on _express.js_
and a few other libraries to help you build production-ready GraphQL servers.

Here’s a list of its features:

- GraphQL spec-compliant
- Supports file upload
- Realtime functionality with GraphQL subscriptions
- Works with TypeScript typings
- Out-of-the-box support for GraphQL Playground
- Extensible via Express middlewares
- Resolves custom directives in your GraphQL schema
- Query performance tracing
- Accepts both application/json and application/graphql content-types
- Runs everywhere: Can be deployed via now, up, AWS Lambda, Heroku etc.

**Prisma** is a tool for building the _Data Access Layer_ for our API. It provides ORM-like capabilities, and deals with even the most complicated, deeply nested queries, in a clean and performant manner. It also comes with out of the box support for _subscriptions_, among other things.

**_Database Layer vs Application Layer_**
The most important part to understand is that when building GraphQL servers with Prisma, you're dealing with two(!) GraphQL APIs:

The **database layer** is provided by Prisma's CRUD/realtime GraphQL API. The GraphQL schema defining this API is the auto-generated Prisma GraphQL schema.
This layer takes care of various concerns related to database access, such as security, synchronization, query optimization and other performance-related tasks.
In our case the schema responsible for this layer is the `datamodel.prisma`

The **application layer** is responsible for any functionality that's not directly related to writing or reading data from the database (like business logic, authentication and permissions, 3rd-party integrations,...).
The application layer is implemented with `graphql-yoga`. The GraphQL schema defining the API of the application layer is called `application schema` (in our case this is the `schema.graphql`).

The **prisma workflow** involves:

- Adding new schema/db changes to `datamodel.prisma`
- Running `prisma deploy` to sync the changes to the db.
- Running `prisma generate` to update the prisma client with the changes. In new versions of prisma, you dont need to do this as its done automatically for you. If you find out that its not, add a `post-deploy hook` to `prisma.yml`
- Update `schema.graphql` with only fields that you wanna expose from your API.
