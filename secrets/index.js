

module.exports = {
  BOT_TOKEN: Buffer.from(process.env.BOT_TOKEN, 'base64').toString('utf-8'),
  CLIENT_ID: Buffer.from(process.env.CLIENT_ID, 'base64').toString('utf-8'),
  GUILD_ID: Buffer.from(process.env.GUILD_ID, 'base64').toString('utf-8'),
  RAPID_API_KEY: Buffer.from(process.env.RAPID_API_KEY, 'base64').toString('utf-8'),
}
