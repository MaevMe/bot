import Interaction from '../types/Interaction'
import Server from '../models/Server'
import registerCommands from '../utils/registerCommands'

const interaction: Interaction = {
  guildCreate: async (client, guild) => {
    try {
      const server = await Server.create({
        id: guild.id,
        tempVoiceChannels: {
          active: false,
          createChannel: '',
          namingFormat: '',
          categoryID: '',
        },
      })

      await registerCommands(guild.id)
      console.log('@createServer success', server)
    } catch (err) {
      console.error('@createServer', err)
    }
  },
}

export default { name: 'create-server', interaction }
