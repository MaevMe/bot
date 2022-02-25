import { User, MessageEmbed } from 'discord.js'
import camelToTitle from '../../../utils/camelToTitle'

const embed = (
  red: User[],
  blue: User[],
  map: string,
  pool: string | null,
  creatorOrCategoryId: string[],
  spectate?: boolean
) => {
  const mapPreference = pool ? camelToTitle(pool) : 'Ranked'
  const redDisplay = red.map(({ id }) => `> <@${id}>`).join('\n')
  const blueDisplay = blue.map(({ id }) => `> <@${id}>`).join('\n')
  const mapURL = map.toLowerCase().replace(/ /g, '-')

  const [creator, category] = creatorOrCategoryId
  const footer = `${mapPreference || 'ranked'} • ${creator}${category ? ` • ${category}` : ''}`

  const message = new MessageEmbed()
    .setColor('#4752C4')
    .setTitle(map)
    .setURL(`https://www.ubisoft.com/en-gb/game/rainbow-six/siege/game-info/maps/${mapURL}`)
    .setThumbnail('attachment://map.jpeg')
    .setFields([
      { name: 'Red Team  ❤️', value: redDisplay, inline: true },
      { name: 'Blue Team  💙', value: blueDisplay, inline: true },
    ])
    .setDescription(
      `**Before starting**\nGet everyone in a VC, otherwise i'll have\nissues dragging the users to their teams.`
    )
    .setFooter({ text: `${footer}`, iconURL: `attachment://logo.png` })

  if (spectate) message.setAuthor({ name: 'Spectated Game' })

  return message
}

export default embed
