import { SlashCommandBuilder } from '@discordjs/builders'

export default new SlashCommandBuilder()
  .setName('ban-user')
  .addUserOption((option) => option.setName('user').setDescription('Who to ban').setRequired(true))
  .addStringOption((option) =>
    option.setName('reason').setDescription('Why are you banning this user?')
  )
  .setDescription('Ban a user')
