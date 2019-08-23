const { GraphQLServer } = require("graphql-yoga")
const { prisma } = require("./generated/prisma-client")

const resolvers = {
  Query: {
    info: () => `War ready!`,
    feed: (parent, args, ctx, info) => ctx.prisma.links()
  },
  Mutation: {
    post: (parent, args, ctx) => {
      return ctx.prisma.createLink({
        ...args
      })
    }
  },
  Link: {
    id: parent => parent.id,
    description: parent => parent.description,
    url: parent => parent.url
  }
}

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: { prisma }
})

server
  .start(() => console.log(`server is running on http://localhost:4000`))
  .catch(err => console.error(`An error occured: ${err}`))
