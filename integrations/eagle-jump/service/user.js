const api = require("../api");

const persistUserThen = async (user, func) => {
  const { id, username, avatar } = user
  try {
    const { name: eName, avatar: eAvatar } = await api.user.get(id)
    if (eName !== name || avatar !== eAvatar) {
      await api.user.save({ discordId: id, name: username, avatar })
    }
    func(user)
  } catch (e) {
    if (!e.response) {
      throw new Error("eagle-jump api is down")
    }
    if (e.response.status === 404) {
      await api.user.save({ discordId: id, name: username, avatar })
      func(user)
    }
  }
}

module.exports = {
  sumUserCommand: async ({user, count}) => {
    try {
      await persistUserThen(user, async user => {
        await api.user.sumCommandCount({id: user.id, count})
      })
    } catch (err) {
      console.log(err.message)
    }
  },
  sumUserMessage: async ({user, count}) => {
    try {
      await persistUserThen(user, async user => {
        await api.user.sumMessageCount({id: user.id, count})
      })
    } catch (err) {
      console.log(err.message)
    }
  }
}
