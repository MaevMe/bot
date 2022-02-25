import { SlashCommandBuilder } from '@discordjs/builders'

export default new SlashCommandBuilder()
  .setName('custom-game')
  .setDescription('Create a custom Siege game')
  .addStringOption((option) =>
    option
      .setName('people')
      .setDescription('Mention the users you want to include, minimum three players.')
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName('maps')
      .setDescription('Limit Maps? Default is set to Ranked Maps.')
      .addChoices([
        ['All Maps', 'any'],
        ['Ranked Maps', 'ranked'],
        ['Quick Match Maps', 'quick'],
        ['New Comer Maps', 'new'],
      ])
  )
  .addBooleanOption((option) =>
    option.setName('spectate').setDescription('Create game as spectator')
  )
