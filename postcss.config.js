/**
 * @description postcss后处理器配置文件
 * @author aodazhang 2021.04.09
 * @extends https://www.postcss.com.cn/
 */

module.exports = {
  // 1.配置插件
  plugins: [
    require('autoprefixer')() // 针对不同浏览器添加css前缀
  ]
}
