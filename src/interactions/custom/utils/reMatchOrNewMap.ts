import {
  ButtonInteraction,
  Client,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} from 'discord.js'

import getProperties from './getProperties'
import getRandomMap from './getRandomMap'
import logo from '../assets/logo.file'

const newMap = async (client: Client, interaction: ButtonInteraction) => {
  await interaction.deferUpdate()
  if (!interaction.guild) return

  const [embed] = interaction.message.embeds
  const props = getProperties(interaction)
  if (!props || !embed || !embed.footer) return

  const { interactor, mapPreference, creatorId } = props
  const map = getRandomMap(mapPreference)

  if (interactor.id !== creatorId) {
    return interaction.reply({
      content: 'Only the creator of the game can re shuffle the map.',
      ephemeral: true,
    })
  }

  // Updates
  const mapURL = map.name.toLowerCase().replace(/ /g, '-')

  const update = new MessageEmbed(embed)
    .setTitle(map.name)
    .setURL(`https://www.ubisoft.com/en-gb/game/rainbow-six/siege/game-info/maps/${mapURL}`)
    .setThumbnail('attachment://map.jpeg')
    .setFooter({ text: embed.footer?.text, iconURL: 'attachment://logo.png' })

  if (interaction.customId.endsWith('rematch')) {
    const buttons = new MessageActionRow().addComponents([
      new MessageButton({ customId: 'start-game', label: 'Start Game', style: 'PRIMARY' }),
      new MessageButton({ customId: 'new-map', label: 'New Map', style: 'SECONDARY' }),
      new MessageButton({ customId: 'new-teams', label: 'New Teams', style: 'SECONDARY' }),
    ])

    return await interaction.editReply({
      embeds: [update],
      files: [map.image, logo],
      components: [buttons],
    })
  } else {
    return await interaction.editReply({ embeds: [update], files: [map.image, logo] })
  }
}

export default newMap
