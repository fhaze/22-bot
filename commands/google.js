const { SlashCommandBuilder } = require('@discordjs/builders')
const axios = require("axios").default
const { RAPID_API_KEY } = require("../secrets")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('google')
    .setDescription('Google Search')
    .addStringOption(opt => opt
      .setName("query")
      .setDescription("Query")
      .setRequired(true)
    ),
  execute: async (_, interaction) => {
    const query = interaction.options.getString("query")
    const options = {
      method: 'GET',
      url: `https://google-search3.p.rapidapi.com/api/v1/search/q=${query.split(" ").join("+")}`,
      headers: {
        'x-user-agent': 'desktop',
        'x-proxy-location': 'BR',
        'x-rapidapi-host': 'google-search3.p.rapidapi.com',
        'x-rapidapi-key': RAPID_API_KEY
      },
    };

    await interaction.deferReply()

    const { data } = await axios.request(options)
    const { results } = data

    const { description, link, title } = results[0]

    await interaction.editReply(`**${title}**\n${description}\n${link}`)
  }
}
