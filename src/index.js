const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const Link = require('./resolvers/Link')
const User = require('./resolvers/User')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')

const resolvers = {
  Query,
  Mutation,
  User,
  Link
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    prisma
  })
})

server
  .start(() => console.log(`server is running on http://localhost:4000`))
  .catch(err => console.error(`An error occured: ${err}`))
