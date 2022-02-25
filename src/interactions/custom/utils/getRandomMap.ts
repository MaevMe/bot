import { MessageAttachment } from 'discord.js'
import folder from '../../../constants/folder'
import path from 'path'
import fs from 'fs'

import pools from '../../../constants/mapPool'

const getRandomMap = (pool: string) => {
  const { quick, newComer, ranked } = pools
  const files = fs.readdirSync(`${path.resolve('./')}${folder}/assets/siege/maps`, {
    withFileTypes: true,
  })

  const maps = files.filter((file) => {
    switch (pool) {
      case 'any':
        return !file.isDirectory()

      case 'quick':
        return !file.isDirectory() && quick.includes(file.name.split('.')[0])

      case 'new':
        return !file.isDirectory() && newComer.includes(file.name.split('.')[0])

      case 'ranked':
      default:
        return !file.isDirectory() && ranked.includes(file.name.split('.')[0])
    }
  })

  const [fileName, ext] = maps
    .map((image) => image.name)
    [Math.floor(Math.random() * maps.length)].split('.')

  const result = fileName.replace(/([A-Z])/g, ' $1')
  const name = `${result.charAt(0).toUpperCase() + result.slice(1)}`.trim()

  const image = new MessageAttachment(
    `./build/assets/siege/maps/${fileName}.${ext}`,
    'map.jpeg'
  ).setDescription(`Photo of ${name}`)

  return { name, image }
}

export default getRandomMap
