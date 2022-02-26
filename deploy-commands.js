const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { CLIENT_ID, GUILD_ID, BOT_TOKEN } = require('./secrets')
const fs = require('fs')

const commands = []
const commandFiles = fs.readdirSync('./interactions/commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./interactions/commands/${file}`)
  commands.push(command.data.toJSON())
}

const rest = new REST({ version: '9' }).setToken(BOT_TOKEN)

rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error)
