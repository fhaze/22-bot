const {SlashCommandBuilder} = require("@discordjs/builders")
const api = require("../integrations/eagle-jump/api");
const Discord = require('discord.js')
const {isoToPretty} = require("../utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('profile')
    .setDescription("Your Eagle Jump's Profile"),
  execute: async (_, interaction) => {
    const { name, messageCount, commandCount, eagleCoin, joinedAt } = await api.user.get(interaction.user.id)

    const embed = new Discord.MessageEmbed()
    embed
      .setAuthor({ name: `${name}'s Profile`, iconURL: interaction.guild.iconURL() })
      .setThumbnail(interaction.user.displayAvatarURL({ size: 256 }))
      .setDescription(`**Messages**
${messageCount}

**Commands**
${commandCount}

**Eagle Coin**
${eagleCoin}

**Joined**
${isoToPretty(joinedAt)}`)

    interaction.reply({ embeds: [ embed ] })
  }
}
