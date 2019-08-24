const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

const post = (parent, args, ctx) => {
  const userId = getUserId(ctx)
  return ctx.prisma.createLink({
    ...args,
    postedBy: { connect: { id: userId } }
  })
}

const signup = async (parent, args, ctx, info) => {
  const password = await bcrypt.hash(args.password, 10)
  const user = await ctx.prisma.createUser({ ...args, password })
  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    user,
    token
  }
}

const login = async (parent, args, ctx, info) => {
  const user = await ctx.prisma.user({ email: args.email })
  if (!user) {
    throw new Error('no such user exists!')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user
  }
}

const vote = async (parent, args, ctx, info) => {
  const userId = getUserId(ctx)
  const voteExists = await ctx.prisma.$exists.vote({
    link: { id: args.linkId },
    user: { id: userId }
  })

  if (voteExists) {
    throw new Error(`You already voted for link ${args.linkId}`)
  }

  return ctx.prisma.createVote({
    link: { connect: { id: args.linkId } },
    user: { connect: { id: userId } }
  })
}

module.exports = {
  post,
  signup,
  login,
  vote
}
