import { SlashCommandBuilder } from '@discordjs/builders'

export default new SlashCommandBuilder()
  .setName('unban-user')
  .addUserOption((option) =>
    option.setName('user').setDescription('Who to unban').setRequired(true)
  )
  .addStringOption((option) =>
    option.setName('reason').setDescription('Why are you unbanning this user?')
  )
  .setDescription('Unban a user')
