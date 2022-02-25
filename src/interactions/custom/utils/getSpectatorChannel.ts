import { ButtonInteraction, CategoryChannel, VoiceChannel } from 'discord.js'

const getSpectatorChannel = async (category: CategoryChannel, interaction: ButtonInteraction) => {
  if (!interaction.guild) return undefined

  let spectateChannel: VoiceChannel | undefined = undefined
  const spectatorChannelId = category.children
    .filter((channel) => channel.name.toLowerCase().includes('spect'))
    .first()?.id

  if (spectatorChannelId) {
    const tempChannel = await interaction.guild.channels.fetch(spectatorChannelId)

    if (tempChannel?.type === 'GUILD_VOICE') {
      spectateChannel = tempChannel
    }
  }

  return spectateChannel
}

export default getSpectatorChannel
