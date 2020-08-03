const path = require('path')

module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config.module.rules.delete("svg");
    const dir = path.resolve(__dirname, 'src/assets/icons');
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(dir)
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        extract:false,
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
