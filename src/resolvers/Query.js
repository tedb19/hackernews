const info = () => `War ready!`

const feed = (parent, args, ctx, info) => {
  const where = args.filter
    ? {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter }
        ]
      }
    : {}

  return ctx.prisma.links({ where })
}

const votes = (parent, args, ctx, info) => ctx.prisma.votes()

module.exports = {
  feed,
  info,
  votes
}
