const { BOT_TOKEN } = require("./secrets")
const { Collection} = require('discord.js')
const fs = require("fs")
const { sumUserMessage, sumUserCommand } = require('./integrations/eagle-jump/service/user')
const { client } = require('./integrations/discord')

client.commands = new Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

commandFiles.forEach(file => {
  const command = require(`./commands/${file}`)
  client.commands.set(command.data.name, command)
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return

  const command = client.commands.get(interaction.commandName)
  if (!command) return

  try {
    await command.execute(client, interaction)
    await sumUserCommand({ user: interaction.user, count: 1 })
  } catch (error) {
    console.error(error)
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
  }
})

client.on('messageCreate', async message => {
  if (!message.content.startsWith("/")) {
    await sumUserMessage({ user: message.author, count: 1 })
  }
})

client.once('ready', () => {
  console.log('Ready!')
})

client.login(BOT_TOKEN)
