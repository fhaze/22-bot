const {SlashCommandBuilder} = require("@discordjs/builders")
const Discord = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('role')
    .addStringOption(option => option.setName("role1").setDescription("insert a role and emoji").setRequired(true))
    .addStringOption(option => option.setName("role2").setDescription("insert a role and emoji"))
    .addStringOption(option => option.setName("role3").setDescription("insert a role and emoji"))
    .addStringOption(option => option.setName("role4").setDescription("insert a role and emoji"))
    .addStringOption(option => option.setName("role5").setDescription("insert a role and emoji"))
    .addStringOption(option => option.setName("role6").setDescription("insert a role and emoji"))
    .addStringOption(option => option.setName("role7").setDescription("insert a role and emoji"))
    .addStringOption(option => option.setName("role8").setDescription("insert a role and emoji"))
    .addStringOption(option => option.setName("role9").setDescription("insert a role and emoji"))
    .setDescription('Role Chooser'),
  execute: async (client, interaction) => {
    // TODO: remove hardcoded id
    if (interaction.user.id !== "383046742540681218") {
      await interaction.reply({ content: "You don't have permission for this.", ephemeral: true })
      return
    }

    const opts = new Map()

    for (let i = 1; i < 9; i++) {
      const tuple = interaction.options.getString(`role${i}`)

      if (!tuple) {
        continue
      }

      const role = tuple.match(/<@&[0-9]+>/)
      const emoji = tuple.match(/<a?:.+:[0-9]+>/)

      if (!role || !emoji || role.length !== 1 || emoji.length !== 1) {
        continue
      }

      opts.set(emoji[0], role[0])
    }

    let content = ""
    for (let [emoji, role] of opts) {
      content += `${emoji} ${role}\n`
    }


    const embed = new Discord.MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL({size: 128}))
      .setTitle("Role Chooser")
      .setDescription(content)

    const msg = await interaction.reply({ embeds: [embed], fetchReply: true })
    for (let [emoji, _] of opts) {
      console.log(emoji)
      await msg.react(emoji)
    }

  }
}
