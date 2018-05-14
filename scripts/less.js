const fs = require('fs')
const less = require('less')
const path = require('path')

const srcPath = path.join(__dirname, '../lib')

// 读取目录 筛选less文件
function findLessFile(srcPath) {
  const fileNames = fs.readdirSync(srcPath)
  fileNames.forEach(function (item) {
    const src = path.join(srcPath, item)
    const isDic = fs.statSync(src).isDirectory()
    if (isDic) {
      findLessFile(src)
    } else if (src.indexOf('.less') !== -1) {
      compileLess(src)
    }
  })
}


function compileLess(src) {
  const lessContent = fs.readFileSync(src, 'utf-8')
  less.render(lessContent, function (err, data) {
    if (err) {
      console.log(err)
    }
    const fileName = src.replace('.less', '.css')
    console.log(fileName)
    fs.writeFileSync(fileName, data.css)
    fs.unlinkSync(src)
    console.log(`${src} -> ${fileName}`)
  })
}

findLessFile(srcPath)