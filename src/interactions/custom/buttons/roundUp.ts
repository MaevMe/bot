import { ButtonInteraction, Client, MessageActionRow, MessageButton } from 'discord.js'
import getProperties from '../utils/getProperties'
import getVCbyName from '../utils/getVCbyName'

const roundUp = async (client: Client, interaction: ButtonInteraction) => {
  await interaction.deferUpdate()
  if (!interaction.guild) return

  const props = getProperties(interaction)
  if (!props) return

  const { interactor, creatorId, category, mentions, spectate } = props

  if (interactor.id !== creatorId) {
    return interaction.reply({
      content: 'Only the creator of the game can move users.',
      ephemeral: true,
    })
  }

  if (!mentions?.length || category?.type !== 'GUILD_CATEGORY')
    return console.log('Missing something')

  const [roundup] = getVCbyName(['roundup'], category)

  for (let mention of mentions) {
    const id = mention.substring(2, mention.length - 1)
    const { voice } = await interaction.guild.members.fetch(id)

    if (voice.channel) await voice.setChannel(roundup)
  }

  if (spectate && interaction.member) {
    const { voice } = await interaction.guild.members.fetch(interaction.member.user.id)
    if (voice.channel) await voice.setChannel(roundup)
  }

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
    new MessageButton({ customId: 'sort-teams', label: 'Put In Teams', style: 'SECONDARY' }),
  ])

  await interaction.editReply({ components: [buttons] })
}

export default roundUp
