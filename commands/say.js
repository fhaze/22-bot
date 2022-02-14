const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType } = require('@discordjs/voice')
const { SlashCommandBuilder } = require('@discordjs/builders')
const axios = require("axios").default
const { VOICE_RSS_KEY} = require("../secrets")
const { writeFileSync } = require('fs')
const crypto = require('crypto')

const player = createAudioPlayer()

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Say something on the channel you are on')
    .addStringOption(opt => opt
      .setName("text")
      .setDescription("Text to be said")
      .setRequired(true)
    )
    .addStringOption(opt => opt
      .setName("source")
      .setDescription("Source Language")
      .setRequired(false)
      .addChoice("Portuguese", "pt-br")
      .addChoice("English", "en-us")
      .addChoice("Chinese", "zh-cn")
      .addChoice("Japanese", "ja-jp")
      .addChoice("Deutsche", "de-de")
    ),
  execute: async (client, interaction) => {
    const text = interaction.options.getString("text")
    let source = interaction.options.getString("source")

    if (source === null || source === "") {
      source = "pt-br"
    }

    const options = {
      responseType: 'arraybuffer',
      method: 'POST',
      url: 'https://api.voicerss.org/',
      params: {
        key: VOICE_RSS_KEY,
        src: text,
        hl: source,
        r: '0',
        c: 'mp3',
        f: '22khz_8bit_mono'
      },
    }

    const { data } = await axios.request(options)
    const tmp = `/tmp/${crypto.randomBytes(20).toString('hex')}.mp3`;
    writeFileSync(tmp, data)
    const resource = createAudioResource(tmp, {inputType: StreamType.Arbitrary})
    player.play(resource)

    const guild = client.guilds.cache.get(interaction.guildId)
    const member = guild.members.cache.get(interaction.member.user.id);
    const voiceChannel = member.voice.channel;

    await interaction.deferReply()

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator
    })

    player.addListener('stateChange', (_, state) => {
      if (state.status === "idle") {
        connection.destroy()
        player.removeAllListeners()
      }
    })

    try {
      connection.subscribe(player)
    } catch (error) {
      console.error(error)
    }

    await interaction.editReply(`I said "${text}" on the <#${voiceChannel.id}> channel.`)
  }
}
