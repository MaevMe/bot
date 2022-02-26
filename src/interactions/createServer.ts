import Interaction from '../types/Interaction'
import Server from '../models/Server'

const interaction: Interaction = {
  guildCreate: async (client, guild) => {
    try {
      await Server.create({
        id: guild.id,
      })
    } catch (err) {
      console.log('@createServer', err)
    }
  },
}

export default { name: 'create-server', interaction }
