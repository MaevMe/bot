import Interaction from '../types/Interaction'
import Server from '../models/Server'

import registerCommands from '../utils/registerCommands'

const interaction: Interaction = {
  guildCreate: async (client, guild) => {
    try {
      await Server.create({
        id: guild.id,
        tempVoiceChannels: {
          active: false,
          usingCreatedChannels: false,
          createChannelID: '',
          categoryID: '',
          namingFormat: '{index}┃{username}',
          userLimit: 20,
          includeTextChannel: false,
        },
      })

      await registerCommands(guild.id)
    } catch (err) {
      console.error('@createServer', err)
    }
  },
}

export default { name: 'create-server', interaction }
