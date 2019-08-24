const user = (parent, args, ctx, info) => {
  return ctx.prisma.vote({ id: parent.id }).user()
}

const link = (parent, args, ctx, info) => {
  return ctx.prisma.vote({ id: parent.id }).link()
}

module.exports = {
  link,
  user
}
