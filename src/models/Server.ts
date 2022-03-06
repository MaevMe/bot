import { Schema, model } from 'mongoose'

const serverSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  tempVoiceChannels: {
    active: Boolean,
    usingCreatedChannels: Boolean,
    createChannelID: String,
    namingFormat: String,
    categoryID: String,
    userLimit: Number,
    includeTextChannel: Boolean,
  },
})

export default model('Server', serverSchema)
