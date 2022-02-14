const { SlashCommandBuilder } = require('@discordjs/builders')
const fs = require('fs')
const config = require("../config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Information about Kou Yagami Bot'),
  execute: async interaction => {
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

    const msg = `**Environment**: ${config.COMMIT_HASH ? "[Tencent Cloud](https://cloud.tencent.com)" : "Running on my Local Machine"}
**Commit Hash**: [${config.COMMIT_HASH ?? "Unknown"}](https://hub.docker.com/repository/docker/fhaze/kou-yagami)"}
**OS**: ${version.join(" ")}
**Created by**: [FHaze](https://github.com/fhaze)`

    interaction.reply(msg)
  }
}
