import {
  ButtonInteraction,
  CategoryChannel,
  Client,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} from 'discord.js'

import createChannels from '../utils/createChannels'
import getProperties from '../utils/getProperties'
import moveToTeamsReturnUsers from '../utils/moveToTeamsReturnUsers'

const startGame = async (client: Client, interaction: ButtonInteraction) => {
  if (!interaction.guild) return

  const [embed] = interaction.message.embeds
  const props = getProperties(interaction)
  if (!props || !embed?.footer) return

  const { guild } = interaction
  const { interactor, creatorId, mentions, spectate, category: existingCategory } = props

  if (interactor.id !== creatorId) {
    return interaction.reply({
      content: 'Only the creator of the game can start it.',
      ephemeral: true,
    })
  }

  if (!mentions) return

  let category: CategoryChannel | undefined

  if (existingCategory) {
    const temp = await existingCategory.fetch()
    if (temp?.type === 'GUILD_CATEGORY') category = temp
  } else {
    category = await (await createChannels(guild, interactor.username, spectate)).category
  }

  if (!category) return
  const half = Math.ceil(mentions.length / 2)
  const [redTeam, blueTeam] = [mentions.slice(0, half), mentions.slice(half, mentions.length)]

  await moveToTeamsReturnUsers(redTeam, blueTeam, interaction, category)

  // Updates
  const buttons = new MessageActionRow().addComponents([
    new MessageButton({
      customId: 'new-game',
      label: 'New Game',
      style: 'SUCCESS',
    }),
    new MessageButton({
      customId: 'end-game',
      label: 'End Session',
      style: 'DANGER',
    }),
    new MessageButton({
      customId: 'new-map-rematch',
      label: 'Re-match',
      style: 'SECONDARY',
    }),
    new MessageButton({
      customId: 'round-up',
      label: 'Roundup',
      style: 'SECONDARY',
    }),
  ])

  const footer = existingCategory ? embed.footer.text : `${embed.footer.text} • ${category.id}`

  const update = new MessageEmbed(embed).setFooter({
    ...embed.footer,
    text: footer,
  })

  await interaction.update({
    embeds: [update],
    components: [buttons],
    files: [],
  })
}

export default startGame
