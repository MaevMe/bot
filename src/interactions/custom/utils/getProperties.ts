import type { ButtonInteraction } from 'discord.js'
import regex from '../../../constants/regex'

const getProperties = (interaction: ButtonInteraction) => {
  const [embed] = interaction.message.embeds
  const { title, footer, fields } = embed

  if (!footer || !embed) return undefined
  if (!interaction.member) return undefined

  const [mapPreference, creatorId, categoryId] = footer.text.split('•').map((id) => id.trim())
  if (!creatorId) return undefined

  const mentions = fields
    ?.map((field) => field.value)
    .join(' ')
    .match(regex.mentionedUser)
  const category = interaction.guild?.channels.cache.get(categoryId)

  return {
    map: title,
    mapPreference,
    interactor: interaction.member.user,
    creatorId: creatorId,
    spectate: !!embed.author,
    category,
    mentions,
  }
}

export default getProperties
