const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: isProd ? '/kakeibo01-ver1.0' : '/',
  outputDir: 'docs',
  filenameHashing: false,
  productionSourceMap: false
}