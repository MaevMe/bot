import { User } from 'discord.js'

const getRandomTeams = (players: User[]) => {
  for (let i = players.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    const item = players[i]

    players[i] = players[randomIndex]
    players[randomIndex] = item
  }

  const half = Math.ceil(players.length / 2)
  return [players.slice(0, half), players.slice(half, players.length)]
}

export default getRandomTeams
