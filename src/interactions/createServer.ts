import Interaction from '../types/Interaction'
import Server from '../models/Server'

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
      console.log('@createServer success', server)
    } catch (err) {
      console.error('@createServer', err)
    }
  },
}

export default { name: 'create-server', interaction }
