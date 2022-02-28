module.exports = class CacheFlusher {
  constructor({ period, flush }) {
    this.storage = new Map()
    this.period = period
    this.flush = flush
  }
  upsert(key, { messageCount, commandCount, user }) {
    const data = this.storage.get(key)
    if (data) {
      if (messageCount) {
        data.messageCount += messageCount
      }
      if (commandCount) {
        data.commandCount += commandCount
      }
      if (user) {
        data.user = user
      }
      this.storage.set(key, data)
    } else {
      this.storage.set(key, {
        messageCount: messageCount ?? 0,
        commandCount: commandCount ?? 0,
        user: user ?? {}
      })
      setTimeout(() => {
        this.flush(key, this.storage.get(key))
        this.storage.delete(key)
      }, this.period)
    }
  }
}
