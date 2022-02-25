import { VoiceBasedChannel } from 'discord.js'

const getAction = (
  createChannelId: string,
  categoryID: string,
  newChannelId: string | null,
  oldChannelId: string | null,
  oldChannel: VoiceBasedChannel | null
) => {
  const left = newChannelId ? false : true
  const moved = oldChannelId !== newChannelId
  const joined = !oldChannelId && !!newChannelId
  const empty = oldChannel?.members.size === 0

  // TODO: Check depending on if ids are found in categoryIds or createChannelIds

  // if (createChannelIds.includes(newChannelId) && (joined || moved)) return 'create'

  // if (categoryIds.includes(oldChannel?.parentId) && (left || moved)) {
  //   if (createChannelIds.includes(oldChannelId) && moved) return
  //   return empty ? 'delete' : 'rename'
  // }

  if (newChannelId === createChannelId && (joined || moved)) return 'create'

  if (oldChannel?.parentId === categoryID && (left || moved)) {
    if (oldChannelId === createChannelId && moved) return
    return empty ? 'delete' : 'rename'
  }
}

export default getAction
