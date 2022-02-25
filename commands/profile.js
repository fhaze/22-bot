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
      .addFields(
        { name: "Level", value: `1`, inline: true },
        { name: "EXP", value: `0`, inline: true },
        { name: "\u200B", value: `\u200B`, inline: true },
        { name: "Messages", value: `${messageCount}`, inline: true },
        { name: "Commands", value: `${commandCount}`, inline: true },
        { name: "Eagle Coin", value: `${eagleCoin}`, inline: true },
        { name: "Joined", value: isoToPretty(joinedAt) },
      )


    interaction.reply({ embeds: [ embed ] })
  }
}
