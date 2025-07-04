const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 放在子目录也能运行,若不配只能在根目录访问
  publicPath: './',
  transpileDependencies: true
})
