import { Client, CommandInteraction } from 'discord.js'
import Interaction from '../types/Interaction'

const interaction: Interaction = {
  commands: new Map<string, (client: Client, interaction: CommandInteraction) => any>().set(
    'timeout',
    (client, interaction) => {
      const user = interaction.options.getUser('user')
      const reason = interaction.options.getString('reason')
      const duration = interaction.options.getNumber('duration')
      const guild = interaction.guild

      if (user && guild) {
        if (reason)
          return guild.members.cache
            .find((member) => member.id === user.id)
            ?.timeout(duration, reason)
        return guild.members.cache.find((member) => member.id === user.id)?.timeout(duration)
      }
    }
  ),
}

export default { name: 'timeout', interaction }
