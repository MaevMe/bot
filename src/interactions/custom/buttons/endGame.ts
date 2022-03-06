import { ButtonInteraction, Client } from 'discord.js'
import getProperties from '../utils/getProperties'

const endGame = async (client: Client, interaction: ButtonInteraction) => {
  await interaction.deferUpdate()
  if (!interaction.guild) return

  const props = getProperties(interaction)
  if (!props) return

  const { interactor, creatorId, category } = props

  if (interactor.id !== creatorId) {
    return interaction.editReply({
      content: 'Only the creator of the game can end it.',
    })
  }
  if (category?.type === 'GUILD_CATEGORY') {
    category.children.forEach(async child => {
      if (child.deletable) await child.delete()
    })

    if (category.deletable) await category.delete()
  }

  await interaction.editReply({ components: [] })
}

export default endGame
