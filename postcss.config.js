/**
 * @description postcss后处理器配置文件
 * @author aodazhang 2020.03.08
 * @extends https://github.com/michael-ciniawsky/postcss-load-config
 */

module.exports = {
  plugins: [
    // 1.针对不同浏览器添加css前缀
    require('autoprefixer')()
  ]
}
