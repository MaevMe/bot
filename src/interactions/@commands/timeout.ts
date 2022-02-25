import { SlashCommandBuilder } from '@discordjs/builders'

export default new SlashCommandBuilder()
  .setName('timeout')
  .addUserOption((option) =>
    option.setName('user').setDescription('Who to timeout').setRequired(true)
  )
  .addStringOption((option) =>
    option.setName('reason').setDescription('Why are you giving this user a timeout?')
  )
  .addNumberOption((option) =>
    option.setName('duration').setDescription('How many seconds to time out the user?')
  )
  .setDescription('Give a user a timeout')
