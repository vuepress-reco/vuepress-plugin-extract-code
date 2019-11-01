const { path } = require('@vuepress/shared-utils')
const extractCodeFromVueSFC = require('./bin/extractCodeFromVueSFC.js')

module.exports = (options, context) => ({
  name: '@vuepress-reco/vuepress-plugin-extract-code',
  chainMarkdown (config) {
    config.plugin('extract-code')
      .use(extractCodeFromVueSFC)
  },
  enhanceAppFiles: [
    path.resolve(__dirname, './bin/enhanceAppFile.js')
  ]
})
