const {MessageEmbed} = require("discord.js");
const {guessGhostEmbed, saveEvidence, EVIDENCE_RESET, EVIDENCE_NONE} = require("../../service/ghost");
const {logger} = require("../../logger");
module.exports = {
  execute: async (interaction, id) => {
    let evidenceText = interaction.message.embeds[1].description
    if (id === EVIDENCE_RESET) {
      evidenceText = EVIDENCE_NONE
    } else {
      evidenceText = saveEvidence(evidenceText, id)
    }
    const ghostEmbed = guessGhostEmbed(evidenceText)

    const evidenceEmbed = new MessageEmbed()
      .setTitle("Evidences")
      .setDescription(evidenceText)

    try {
      await interaction.message.edit({embeds: [ghostEmbed, evidenceEmbed]})
      await interaction.deferUpdate()
    } catch (e) {
      logger.error(`ghost evidence=${id} press: ${e.message}`)
    }
  }
}
