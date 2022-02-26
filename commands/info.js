const { SlashCommandBuilder } = require('@discordjs/builders')
const fs = require('fs')
const config = require("../config")
const Discord = require("discord.js");
const { client } = require("../integrations/discord");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Information about 22娘 Bot'),
  execute: async (_, interaction) => {
    const data = fs.readFileSync('/etc/os-release', 'utf8').split("\n")
    let version = []

    data.forEach(line => {
      const split = line.split("=")
      const key = split[0]
      const val = split[1]?.replaceAll("\"","")

      if (key === "NAME" || key === "VERSION") {
        version = [...version, val]
      }
    })

    const embed = new Discord.MessageEmbed()
    embed
      .setAuthor({ name: "22娘's Info", iconURL: interaction.guild.iconURL() })
      .setThumbnail(client.user.displayAvatarURL({ size: 256 }))
      .setFields(
        {name: "Running on", value: config.COMMIT_HASH ? "[Tencent Cloud](https://cloud.tencent.com)" : "My Local Machine"},
        {name: "Image Tag", value: `[${config.COMMIT_HASH ?? "Unknown"}](https://hub.docker.com/repository/docker/fhaze/discord-22-bot)`},
        {name: "OS", value: version.join(" ")},
        {name: "Created by", value: "[FHaze](https://github.com/fhaze)"},
      )
    interaction.reply({ embeds: [embed] })
  }
}
