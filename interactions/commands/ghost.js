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
    // TODO: remove hardcoded id
    if (interaction.user.id !== "383046742540681218") {
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
