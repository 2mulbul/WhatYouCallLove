export function download(url, fullName) {
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.style.display = 'none'
  anchor.setAttribute('download', fullName)
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
}



export default function screenshot(imgNode, format = 'png', quality = 0.97) {
  const canvas = document.createElement('canvas')
  canvas.width = imgNode.width
  canvas.height = imgNode.height

  const context = canvas.getContext('2d', {alpha: false})
  context.fillStyle='black';
  context.filter = getComputedStyle(imgNode).filter

  imgNode.setAttribute('crossOrigin', 'anonymous')

  context.drawImage(imgNode, 0, 0, canvas.width, canvas.height)
  const url = canvas.toDataURL(`image/${format}`, quality)

  return {
    url,
    then: (cb) => {
      cb(url)
    },
    download: (name = 'whatyoucall') => {
      download(url, `${name}.${format}`)
    }
  }
}
