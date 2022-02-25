import { ButtonInteraction, CategoryChannel, User } from 'discord.js'
import getVCbyName from './getVCbyName'

const moveToTeamsReturnUsers = async (
  redTeam: string[],
  blueTeam: string[],
  interaction: ButtonInteraction,
  category: CategoryChannel
) => {
  const users: User[] = []
  if (!interaction.guild) return

  const [blue, red, spectator] = getVCbyName(['blue', 'red', 'spect'], category)

  if (spectator && interaction.member) {
    const { voice } = await interaction.guild.members.fetch(interaction.member.user.id)
    if (voice.channel) await voice.setChannel(spectator)
  }

  for (let player of redTeam) {
    const id = player.substring(2, player.length - 1)
    const { voice, user } = await interaction.guild.members.fetch(id)

    if (voice.channel) await voice.setChannel(red)
    users.push(user)
  }

  for (let player of blueTeam) {
    const id = player.substring(2, player.length - 1)
    const { voice, user } = await interaction.guild.members.fetch(id)

    if (voice.channel) await voice.setChannel(blue)
    users.push(user)
  }

  return users
}

export default moveToTeamsReturnUsers
