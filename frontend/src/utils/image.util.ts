import sharp from 'sharp'

const trimImageWhitespace = async (imageBuffer: Buffer, filename: string) => {
  let image = sharp(imageBuffer)
  const metadata = await image.metadata()!
  const background = await getTopLeftColor(imageBuffer)
  const fileFormat = `${filename.split('.').pop()}`

  image = image.trim({ threshold: 5 })
  const { info } = await image.toBuffer({ resolveWithObject: true })

  const verticalExtend = (metadata.height! - info.height) / 2
  const horizontalExtend = (metadata.width! - info.width) / 2

  image = image.extend({
    background,
    top: Math.ceil(verticalExtend),
    bottom: Math.floor(verticalExtend),
    left: Math.ceil(horizontalExtend),
    right: Math.floor(horizontalExtend),
  })

  return image.toFormat(fileFormat as any).toBuffer()
}

const getTopLeftColor = async (imageBuffer: Buffer) => {
  const image = sharp(imageBuffer)
  const { data } = await image.raw().ensureAlpha().toBuffer({ resolveWithObject: true })

  const topLeftIndex = 0

  return {
    r: data[topLeftIndex],
    g: data[topLeftIndex + 1],
    b: data[topLeftIndex + 2],
    alpha: data[topLeftIndex + 3] / 255,
  }
}
