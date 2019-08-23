const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const post = (parent, args, ctx) => {
  return ctx.prisma.createLink({
    ...args
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
    throw new Error("no such user exists!")
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error("invalid password")
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user
  }
}

module.exports = {
  post,
  signup,
  login
}
