/**
 * @description @babel/core配置文件
 * @author aodazhang 2021.01.25
 */

module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    // vue-jsx@next：https://github.com/vuejs/jsx-next
    '@vue/babel-plugin-jsx'
    // ant-design-vue按需引入：使用babel-plugin-import请解除下面注释
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
