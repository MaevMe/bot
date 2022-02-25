import { ButtonInteraction, Client, MessageEmbed, User } from 'discord.js'

import getProperties from '../utils/getProperties'
import getRandomTeams from '../utils/getRandomTeams'

const newTeams = async (client: Client, interaction: ButtonInteraction) => {
  await interaction.deferUpdate()
  if (!interaction.guild) return

  const [embed] = interaction.message.embeds
  const props = getProperties(interaction)
  if (!props || !embed?.footer) return

  const { mentions, interactor, creatorId } = props

  if (interactor.id !== creatorId) {
    return interaction.reply({
      content: 'Only the creator of the game can shuffle the players.',
      ephemeral: true,
    })
  }

  if (!mentions) return
  const players: User[] = []

  for (const mention of mentions) {
    const { user } = await interaction.guild?.members.fetch(
      mention.substring(2, mention.length - 1)
    )
    players.push(user)
  }

  const [redUsers, blueUsers] = getRandomTeams(players)

  // Updates
  const redDisplay = redUsers.map(({ id }) => `> <@${id}>`).join('\n')
  const blueDisplay = blueUsers.map(({ id }) => `> <@${id}>`).join('\n')

  const update = new MessageEmbed(embed)
    .setFields([
      { name: 'Red Team  ❤️', value: redDisplay, inline: true },
      { name: 'Blue Team  💙', value: blueDisplay, inline: true },
    ])
    .setThumbnail('attachment://map.jpeg')
    .setFooter({ text: embed.footer?.text, iconURL: 'attachment://logo.png' })

  await interaction.editReply({ embeds: [update] })
}

export default newTeams
