import { Client, CommandInteraction } from 'discord.js'
import Interaction from '../types/Interaction'

const interaction: Interaction = {
  commands: new Map<string, (client: Client, interaction: CommandInteraction) => any>().set(
    'ban',
    (client, interaction) => {
      const user = interaction.options.getUser('user')
      const reason = interaction.options.getString('reason')
      const guild = interaction.guild

      if (user && guild) {
        if (reason) return guild.members.ban(user, { reason })
        return guild.members.ban(user)
      }
    }
  ),
}

export default { name: 'ban', interaction }
