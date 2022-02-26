const api = require("../api");

const persistUserThen = async (user, func) => {
  const { id, username, avatar, bot } = user
  try {
    const existent = await api.user.get(id)
    if (existent.name !== username || existent.avatar !== avatar || existent.bot !== bot) {
      await api.user.save({ discordId: id, name: username, avatar, bot })
    }
    func(user)
  } catch (e) {
    if (!e.response) {
      throw new Error("22 api is down")
    }
    if (e.response.status === 404) {
      await api.user.save({ discordId: id, name: username, avatar, bot })
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
