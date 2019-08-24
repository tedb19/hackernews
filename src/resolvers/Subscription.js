const newLink = {
  subscribe: (parent, args, ctx, info) => {
    return ctx.prisma.$subscribe.link({ mutation_in: ['CREATED'] }).node()
  },
  resolve: payload => payload
}

const newVote = {
  subscribe: (parent, args, ctx, info) => {
    return ctx.prisma.$subscribe.vote({ mutation_in: ['CREATED'] }).node()
  },
  resolve: payload => payload
}

module.exports = {
  newLink,
  newVote
}
