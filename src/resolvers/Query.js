const info = () => `War ready!`
const feed = (parent, args, ctx, info) => ctx.prisma.links()

module.exports = {
  feed,
  info
}
