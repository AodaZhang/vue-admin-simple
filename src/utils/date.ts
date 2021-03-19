/**
 * @description 日期处理
 * @author aodazhang 2021.03.09
 */

/**
 * 格式化日期：Date对象 转换 pattern格式字符串
 * @param date 日期实例
 * @param pattern 日期格式
 * @returns 时间字符串
 */
function dateToString(date: Date, pattern = 'yyyy-MM-dd'): string {
  if (!(date instanceof Date) || typeof pattern !== 'string' || !pattern) {
    return ''
  }
  let result = pattern
  const year = /(y+)/
  const option = new Map([
    [year, date.getFullYear()], // 年
    [/(M+)/, date.getMonth() + 1], // 月
    [/(d+)/, date.getDate()], // 日
    [/(h+)/, date.getHours()], // 时
    [/(m+)/, date.getMinutes()], // 分
    [/(s+)/, date.getSeconds()] // 秒
  ])
  for (const [key, value] of option) {
    if (key.test(result)) {
      // 年不需要补位
      const time =
        key === year ? `${value}` : `00${value}`.substr(`${value}`.length)
      result = result.replace(RegExp.$1, time)
    }
  }
  return result
}

/**
 * 格式化日期：1612108800000 转换 '2021.02.01'
 * @param time 时间戳
 * @returns 时间字符串
 */
function numberToString(time: number): string {
  const date = new Date(time)
  if (typeof time !== 'number' || isNaN(time) || time <= 0) {
    return ''
  }
  return dateToString(date, 'yyyy.MM.dd')
}

export default { dateToString, numberToString }
