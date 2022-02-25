import type { Client, ClientEvents, ButtonInteraction, CommandInteraction } from 'discord.js'

type Events = {
  [K in keyof ClientEvents]?: (client: Client, ...params: ClientEvents[K]) => Promise<void> | void
}

type Interaction = {
  buttons?: Map<string, (client: Client, interaction: ButtonInteraction) => void | any>
  commands?: Map<string, (client: Client, interaction: CommandInteraction) => void | any>
} & Events

export default Interaction
