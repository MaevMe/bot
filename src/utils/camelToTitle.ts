const camelToTitle = (string: string) => {
  let split = string.toLowerCase().split(' ')

  for (var i = 0; i < split.length; i++) {
    split[i] = split[i].charAt(0).toUpperCase() + split[i].substring(1)
  }

  return split.join(' ')
}

export default camelToTitle
