import { Schema, model } from 'mongoose'

const serverSchema = new Schema({
  id: String,
  initialVC: String,
  modUpdates: String,
  reactions: [
    {
      messageID: String,
      reactionRoles: [
        {
          roleID: String,
          reactionID: String,
        },
      ],
    },
  ],
})

export default model('Server', serverSchema)
