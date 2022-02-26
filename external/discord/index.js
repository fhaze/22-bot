const {Client, Intents} = require("discord.js");

const index = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES
  ],
  partials: [
    "MESSAGE",
    "CHANNEL",
    "REACTION"
  ]
})

module.exports = {
  client: index
}
