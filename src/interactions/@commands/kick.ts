import { SlashCommandBuilder } from '@discordjs/builders'

export default new SlashCommandBuilder()
  .setName('kick-user')
  .addUserOption((option) => option.setName('user').setDescription('Who to kick').setRequired(true))
  .addStringOption((option) =>
    option.setName('reason').setDescription('Why are you kicking this user?')
  )
  .setDescription('Kick a user')
