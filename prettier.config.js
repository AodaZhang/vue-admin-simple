/**
 * @description prettier配置文件
 * @author aodazhang 2021.04.09
 * @extends https://prettier.io/docs/en/options.html
 */

module.exports = {
  tabWidth: 2, // 缩进2空格
  semi: false, // 语句结束没有分号
  singleQuote: true, // 字符串使用单引号
  arrowParens: 'avoid', // 箭头函数一个参数时没有括号
  trailingComma: 'none', // 对象末尾属性无逗号
  bracketSpacing: true, // 对象大括号内直接是否有空格，效果{ foo: bar }
  jsxBracketSameLine: false // 多行JSX中的>是否放置在最后一行
}
