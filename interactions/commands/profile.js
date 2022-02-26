const {SlashCommandBuilder} = require("@discordjs/builders")
const api = require("../../external/discord-22/api");
const Discord = require('discord.js')
const {isoToPretty} = require("../../utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('profile')
    .setDescription("Show your Profile"),
  execute: async (_, interaction) => {
    const { name, messageCount, commandCount, eagleCoin, joinedAt, exp, requiredExp, level } = await api.user.get(interaction.user.id)

    const embed = new Discord.MessageEmbed()
    embed
      .setTitle(`${name}'s Profile`)
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
