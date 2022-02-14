const { SlashCommandBuilder } = require('@discordjs/builders')
const axios = require("axios").default
const { RAPID_API_KEY } = require("../secrets")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('translate')
    .setDescription('Translate a text from a language to another')
    .addStringOption(opt => opt
      .setName("text")
      .setDescription("Text to be translated")
      .setRequired(true)
    )
    .addStringOption(opt => opt
      .setName("target")
      .setDescription("Target Language")
      .setRequired(true)
      .addChoice("Portuguese", "pt")
      .addChoice("English", "en")
      .addChoice("Chinese", "zh-CN")
      .addChoice("Japanese", "ja")
      .addChoice("Deutsche", "de")
    )
    .addStringOption(opt => opt
      .setName("source")
      .setDescription("Source Language")
      .setRequired(false)
      .addChoice("Portuguese", "pt")
      .addChoice("English", "en")
      .addChoice("Chinese", "zh-CN")
      .addChoice("Japanese", "ja")
      .addChoice("Deutsche", "de")
    ),
  execute: async (_, interaction) => {
    const source = interaction.options.getString("source")
    const target = interaction.options.getString("target")
    const text = interaction.options.getString("text")

    const options = {
      method: 'POST',
      url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
      params: {
        to: target,
        'api-version': '3.0',
        profanityAction: 'NoAction',
        textType: 'plain'
      },
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com',
        'x-rapidapi-key': RAPID_API_KEY
      },
      data: [{Text: text}]
    }

    if (source !== "" && source !== null) {
      options.params.from = source
    }

    await interaction.deferReply()

    const { data } = await axios.request(options)
    const translatedText = data[0].translations[0].text

    await interaction.editReply(translatedText)
  }
}
