import icons from './icons'

//Start Figma UI
figma.showUI(__html__, { width: 340, height: 550 })

//Verify returned icon matches icon button clicked
const finder = (msg: string, pack: string, category: string, id:number) => {
  for (const icon of icons) {
    if (icon.name === msg && icon.pack === pack && icon.category === category)
      return icon.toSVG(id)
  }
}

figma.ui.onmessage = message => {
  const icon = figma.createNodeFromSvg(finder(message.type, message.pack, message.category, message.id))
  icon.name = message.type
  icon.x = figma.viewport.center.x
  icon.y = figma.viewport.center.y
  figma.currentPage.selection = [icon]
}