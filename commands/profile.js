const {SlashCommandBuilder} = require("@discordjs/builders")
const api = require("../integrations/eagle-jump/api");
const Discord = require('discord.js')
const {isoToPretty} = require("../utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('profile')
    .setDescription("Show your Profile"),
  execute: async (_, interaction) => {
    const { name, messageCount, commandCount, eagleCoin, joinedAt, exp, requiredExp, level } = await api.user.get(interaction.user.id)

    const embed = new Discord.MessageEmbed()
    embed
      .setAuthor({ name: `${name}'s Profile`, iconURL: interaction.guild.iconURL() })
      .setThumbnail(interaction.user.displayAvatarURL({ size: 256 }))
      .addFields(
        { name: "Level", value: `${level}`, inline: true },
        { name: "EXP", value: `${exp}`, inline: true },
        { name: "To Next Level", value: `${requiredExp}`, inline: true },
        { name: "Messages", value: `${messageCount}`, inline: true },
        { name: "Commands", value: `${commandCount}`, inline: true },
        { name: "Eagle Coin", value: `${eagleCoin}`, inline: true },
        { name: "Joined", value: isoToPretty(joinedAt) },
      )


    interaction.reply({ embeds: [ embed ] })
  }
}
