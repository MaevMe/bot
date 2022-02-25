import { MessageActionRow, MessageButton } from 'discord.js'
import type { Client, CommandInteraction } from 'discord.js'

import getRandomTeams from '../utils/getRandomTeams'
import getRandomMap from '../utils/getRandomMap'
import gameEmbed from '../assets/game.embed'
import logo from '../assets/logo.file'

// TODO: Fix how to reply to interaction if user interactor is not creator of game: YOU ALREADY REPLIED

const customGame = async (client: Client, interaction: CommandInteraction) => {
  if (!interaction.member) return

  const { user } = interaction.member
  const { users } = interaction.options.resolved
  const maps = interaction.options.getString('maps') || 'ranked'
  const spectate = interaction.options.getBoolean('spectate') || false

  if (!users || users.size < 2) return

  const [red, blue] = getRandomTeams(Array.from(users).map(([_, user]) => user))
  const map = getRandomMap(maps)

  // Updates
  const buttons = new MessageActionRow().addComponents([
    new MessageButton({ customId: 'start-game', label: 'Start Game', style: 'PRIMARY' }),
    new MessageButton({ customId: 'new-map', label: 'New Map', style: 'SECONDARY' }),
    new MessageButton({ customId: 'new-teams', label: 'New Teams', style: 'SECONDARY' }),
  ])

  await interaction.reply({
    embeds: [gameEmbed(red, blue, map.name, maps, [user.id], spectate)],
    files: [map.image, logo],
    components: [buttons],
  })
}

export default customGame
