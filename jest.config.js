/**
 * @description jest配置文件
 * @author aodazhang 2020.03.08
 * @extends https://jestjs.io/docs/zh-Hans/configuration
 */

module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  }
}
