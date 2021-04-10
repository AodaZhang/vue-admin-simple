/**
 * @description @babel/core配置文件
 * @author aodazhang 2021.04.09
 * @extends https://www.babeljs.cn/docs/presets
 */

module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    // 1.vue-jsx@next：https://github.com/vuejs/jsx-next
    '@vue/babel-plugin-jsx'
    // 2.ant-design-vue按需引入：使用babel-plugin-import请解除下面注释
    // [
    //   'import',
    //   {
    //     libraryName: 'ant-design-vue',
    //     libraryDirectory: 'es',
    //     style: true // 加载antdv原始less文件
    //   }
    // ]
  ]
}
