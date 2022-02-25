import { Client, ButtonInteraction, MessageActionRow, MessageButton } from 'discord.js'

import getProperties from '../utils/getProperties'
import moveToTeamsReturnUsers from '../utils/moveToTeamsReturnUsers'

const sortTeams = async (client: Client, interaction: ButtonInteraction) => {
  await interaction.deferUpdate()
  if (!interaction.guild) return

  const props = getProperties(interaction)
  if (!props) return

  const { mentions, category, interactor, creatorId } = props

  if (interactor.id !== creatorId) {
    return interaction.reply({
      content: 'Only the creator of the game can move users.',
      ephemeral: true,
    })
  }

  if (!mentions || category?.type !== 'GUILD_CATEGORY') return

  const half = Math.ceil(mentions.length / 2)
  const [red, blue] = [mentions.slice(0, half), mentions.slice(half, mentions.length)]

  await moveToTeamsReturnUsers(red, blue, interaction, category)

  // Updates
  const buttons = new MessageActionRow().addComponents([
    new MessageButton({
      customId: 'new-game',
      label: 'New Game',
      style: 'SUCCESS',
    }),
    new MessageButton({ customId: 'end-game', label: 'End Session', style: 'DANGER' }),
    new MessageButton({
      customId: 'new-map-rematch',
      label: 'Re-match',
      style: 'SECONDARY',
    }),
    new MessageButton({ customId: 'round-up', label: 'Roundup', style: 'SECONDARY' }),
  ])

  await interaction.editReply({ components: [buttons] })
}

export default sortTeams
