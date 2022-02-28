const api = require("../api");
const {logger} = require("../../../logger");
const CacheFlusher = require("../../../cache/CacheFlusher");

const cacheFlusher = new CacheFlusher({
  period: 10_000,
  flush: async (id, { user, messageCount, commandCount }) => {
    try {
      await persistUserThen(user, async () => {
        if (messageCount > 0) {
          logger.info(`user sum message id=${id} count=${messageCount}`)
          await api.user.sumMessageCount({id, count: messageCount})
        }
        if (commandCount > 0) {
          logger.info(`user sum command id=${id} count=${commandCount}`)
          await api.user.sumCommandCount({id, count: commandCount})
        }
      })
    } catch (e) {
      logger.error(`user flushing id=${id} messageCount=${messageCount} commandCount=${commandCount}: ${e.message}`)
    }
  }
})

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
    cacheFlusher.upsert(user.id, { user, commandCount: count })
  },
  sumUserMessage: async ({user, count}) => {
    cacheFlusher.upsert(user.id, { user, messageCount: count })
  }
}
