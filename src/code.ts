import icons from './icons'

//Start Figma UI
figma.showUI(__html__, { width: 340, height: 400 })

//Verify returned icon matches icon button clicked
const finder = (msg: string, style: string) => {
  for (const icon of icons) {
    if (icon.name === msg && icon.style === style)
      return icon.toSvg()
  }
}

figma.ui.onmessage = message => {
  const icon = figma.createNodeFromSvg(finder(message.type, message.style))
  icon.name = message.type
  icon.x = figma.viewport.center.x
  icon.y = figma.viewport.center.y
  figma.currentPage.selection = [icon]
}