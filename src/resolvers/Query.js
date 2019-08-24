const info = () => `War ready!`
const feed = (parent, args, ctx, info) => ctx.prisma.links()
const votes = (parent, args, ctx, info) => ctx.prisma.votes()

module.exports = {
  feed,
  info,
  votes
}
