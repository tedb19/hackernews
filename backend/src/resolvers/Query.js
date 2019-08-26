const info = () => `War ready!`

const feed = async (parent, args, ctx, info) => {
  const where = args.filter
    ? {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter }
        ]
      }
    : {}

  const links = await ctx.prisma.links({
    where,
    first: args.first,
    skip: args.skip,
    orderBy: args.orderBy
  })

  const count = await ctx.prisma
    .linksConnection({
      where
    })
    .aggregate()
    .count()

  return {
    links,
    count
  }
}

const votes = (parent, args, ctx, info) => ctx.prisma.votes()

module.exports = {
  feed,
  info,
  votes
}
