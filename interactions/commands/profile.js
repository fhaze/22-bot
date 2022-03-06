const {SlashCommandBuilder} = require("@discordjs/builders")
const api = require("../../external/discord-22/api");
const Discord = require('discord.js')
const {isoToPretty} = require("../../utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('profile')
    .setDescription("Show your Profile"),
  execute: async (_, interaction) => {
    const { name, messageCount, commandCount, eagleCoin, joinedAt, exp, requiredExp, level, icons } = await api.user.get(interaction.user.id)

    const admin     = interaction.member.roles.cache.find(r => r.name === "Admin")
    const moderator = interaction.member.roles.cache.find(r => r.name === "Moderator")

    const embed = new Discord.MessageEmbed()
    embed
      .setTitle(`${name}'s Profile`)
      .setThumbnail(interaction.user.displayAvatarURL({ size: 256 }))
      .addFields(
        { name: `${admin?.name ?? moderator?.name ?? "Member"}`, value: `\`Lv ${level}\` ${icons}`, inline: true },
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
