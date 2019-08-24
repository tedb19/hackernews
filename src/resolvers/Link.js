const postedBy = (parent, args, ctx, info) => {
  return ctx.prisma.link({ id: parent.id }).postedBy()
}

const votes = (parent, args, ctx, info) => {
  return ctx.prisma.link({ id: parent.id }).votes()
}

module.exports = {
  postedBy,
  votes
}
