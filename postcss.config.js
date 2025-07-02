module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // vw对应适配的标准屏的宽度 iPhoneX
      // 750 2倍图调成1倍图 适配375标准屏
      // 640 调成1倍 适配320标准屏
      viewportWidth: 375
    }
  }
}
