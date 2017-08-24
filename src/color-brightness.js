const colorIsLight = (color, differenceRange) => {
  if (color[0] === '#') {
    color = color.substr(1)
  }
  console.assert(color.length === 6, 'color must have a length of 6 hex numbers')
  const red = parseInt(color.substr(0, 2), 16)
  const green = parseInt(color.substr(2, 2), 16)
  const blue = parseInt(color.substr(4, 2), 16)
  return ((red * 320 + green * 560 + blue * 110) / 1000) > (differenceRange || 125) // suggested by w3
}

const colorIsDark = (color, differenceRange) => {
  return !colorIsLight(color, differenceRange)
}

export { colorIsLight, colorIsDark }