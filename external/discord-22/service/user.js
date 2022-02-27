const api = require("../api");
const {logger} = require("../../../logger");

const persistUserThen = async (user, func) => {
  const { id, username, avatar, bot } = user
  try {
    logger.info(`getting user id=${id}`)
    const existent = await api.user.get(id)
    if (existent.name !== username || existent.avatar !== avatar || existent.bot !== bot) {
      await api.user.save({ discordId: id, name: username, avatar, bot })
      logger.info(`user updated id=${id} name=${username}`)
    }
    func(user)
  } catch (e) {
    if (!e.response) {
      logger.error(`could not save/update user id=${user?.id} name=${user?.username}: ${e.message}`)
      throw new Error("22 api is down")
    }
    if (e.response.status === 404) {
      await api.user.save({ discordId: id, name: username, avatar, bot })
      logger.info(`user saved id=${id} name=${username}`)
      func(user)
    }
  }
}

module.exports = {
  sumUserCommand: async ({user, count}) => {
    try {
      await persistUserThen(user, async user => {
        await api.user.sumCommandCount({id: user.id, count})
        logger.info(`user sum command id=${user.id} name=${user.username} count=1`)
      })
    } catch (err) {
      logger.error(`user sum command id=${user?.id} count=${count}: ${err.message}`)
    }
  },
  sumUserMessage: async ({user, count}) => {
    try {
      await persistUserThen(user, async user => {
        await api.user.sumMessageCount({id: user.id, count})
        logger.info(`user sum message id=${user.id} name=${user.username} count=1`)
      })
    } catch (err) {
      logger.error(`user sum message id=${user?.id} count=${count}: ${err.message}`)
    }
  }
}
