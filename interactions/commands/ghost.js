const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageActionRow, MessageButton, MessageEmbed} = require("discord.js");
const {EVIDENCE_NONE, EVIDENCE_EMF5, EVIDENCE_ORB, EVIDENCE_SPIRIT_BOX, EVIDENCE_FREEZING, EVIDENCE_FINGERPRINTS,
  EVIDENCE_WRITING, EVIDENCE_DOTS, EVIDENCE_RESET, guessGhostEmbed
} = require("../../service/ghost");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ghost')
    .setDescription("Let's find out the ghost type"),
  execute: async (_, interaction) => {
    const admin     = interaction.member.roles.cache.find(r => r.name === "Admin")
    const moderator = interaction.member.roles.cache.find(r => r.name === "Moderator")

    if (!admin && !moderator) {
      await interaction.reply({ content: "You don't have permission for this.", ephemeral: true })
      return
    }

    const row1 = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId(`ghost_${EVIDENCE_EMF5}`)
          .setLabel(EVIDENCE_EMF5)
          .setStyle('PRIMARY'),
        new MessageButton()
          .setCustomId(`ghost_${EVIDENCE_ORB}`)
          .setLabel(EVIDENCE_ORB)
          .setStyle('PRIMARY'),
        new MessageButton()
          .setCustomId(`ghost_${EVIDENCE_SPIRIT_BOX}`)
          .setLabel(EVIDENCE_SPIRIT_BOX)
          .setStyle('PRIMARY'),
        new MessageButton()
          .setCustomId(`ghost_${EVIDENCE_FREEZING}`)
          .setLabel(EVIDENCE_FREEZING)
          .setStyle('PRIMARY'),
      )

    const row2 = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId(`ghost_${EVIDENCE_FINGERPRINTS}`)
          .setLabel(EVIDENCE_FINGERPRINTS)
          .setStyle('PRIMARY'),
        new MessageButton()
          .setCustomId(`ghost_${EVIDENCE_WRITING}`)
          .setLabel(EVIDENCE_WRITING)
          .setStyle('SUCCESS'),
        new MessageButton()
          .setCustomId(`ghost_${EVIDENCE_DOTS}`)
          .setLabel(EVIDENCE_DOTS)
          .setStyle('SUCCESS'),
        new MessageButton()
          .setCustomId(`ghost_${EVIDENCE_RESET}`)
          .setLabel(EVIDENCE_RESET)
          .setStyle('DANGER'),
      )

    const evidenceEmbed = new MessageEmbed()
      .setTitle("Evidence")
      .setDescription(EVIDENCE_NONE)

    const ghostEmbed = guessGhostEmbed(evidenceEmbed.description)

    await interaction.reply({ embeds: [ ghostEmbed, evidenceEmbed ], components: [ row1, row2 ] })
  }
}
