import { ButtonInteraction, Client, MessageActionRow, MessageButton, User } from 'discord.js'
import getProperties from '../utils/getProperties'
import getRandomMap from '../utils/getRandomMap'
import getRandomTeams from '../utils/getRandomTeams'
import gameEmbed from '../assets/game.embed'
import logo from '../assets/logo.file'

const newGame = async (client: Client, interaction: ButtonInteraction) => {
  if (!interaction.member) return

  await interaction.deferUpdate()
  if (!interaction.guild) return

  const [embed] = interaction.message.embeds
  const props = getProperties(interaction)
  if (!props || !embed?.footer) return

  const { mentions, interactor, creatorId, mapPreference, spectate } = props

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

  if (!players) return

  const [red, blue] = getRandomTeams(players)
  const map = getRandomMap(mapPreference)

  // Updates
  const buttons = new MessageActionRow().addComponents([
    new MessageButton({ customId: 'start-game', label: 'Start Game', style: 'PRIMARY' }),
    new MessageButton({ customId: 'new-map', label: 'New Map', style: 'SECONDARY' }),
    new MessageButton({ customId: 'new-teams', label: 'New Teams', style: 'SECONDARY' }),
  ])

  const update = gameEmbed(
    red,
    blue,
    map.name,
    mapPreference,
    [interaction.member.user.id],
    spectate
  ).setFooter({ text: embed.footer.text, iconURL: `attachment://logo.png` })

  await interaction.editReply({
    embeds: [update],
    files: [map.image, logo],
    components: [buttons],
  })
}

export default newGame
