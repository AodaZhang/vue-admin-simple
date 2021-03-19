/**
 * @description 设备判断
 * @author aodazhang 2021.03.09
 */

export type DeviceType = 'windows' | 'macos' | 'linux' | 'android' | 'ios'

/**
 * 获取当前运行设备类型
 * @returns 设备类型
 */
function getDeviceType(): DeviceType {
  // 获取浏览器ua信息
  const ua = navigator.userAgent.toLowerCase()
  // 设备类型
  let system: DeviceType = 'windows'
  if (/windows|win32|win64|wow32|wow64/g.test(ua)) {
    system = 'windows' // windows系统
  } else if (/macintosh|macintel/g.test(ua)) {
    system = 'macos' // macos系统
  } else if (/x11/g.test(ua)) {
    system = 'linux' // linux系统
  } else if (/android|adr/g.test(ua)) {
    system = 'android' // android系统
  } else if (/ios|iphone|ipad|ipod|iwatch/g.test(ua)) {
    system = 'ios' // ios系统
  } else if (/mobile/g.test(ua)) {
    system = 'android' // 缺省移动端设备默认为android系统
  }
  return system
}

/**
 * 判断设备是否为移动端
 * @returns 是否为移动端
 */
function getDeviceIsMobile(): boolean {
  const system = getDeviceType()
  if (['android', 'ios'].includes(system)) {
    return true
  } else {
    return false
  }
}

/**
 * 获取设备dpr
 * @returns 设备dpr
 */
function getDeviceDpr(): number {
  return window.devicePixelRatio || 1
}

/**
 * 获取设备宽度
 * @returns 设备宽度
 */
function getDeviceWidth(): number {
  return document.documentElement.clientWidth || window.innerWidth || 0
}

/**
 * 获取设备高度
 * @returns 设备高度
 */
function getDeviceHeight(): number {
  return document.documentElement.clientHeight || window.innerHeight || 0
}

/**
 * 根据设备宽度计算rem
 * @param mobileFitSize 移动端设计稿宽度(px)
 * @param pcFitSize  pc端设计稿宽度(px)
 * @param pcMinWidth pc端最小适配宽度(px)
 * @returns 无
 */
function calcDeviceRem(
  mobileFitSize?: number,
  pcFitSize?: number,
  pcMinWidth?: number
): void {
  typeof mobileFitSize !== 'number' && (mobileFitSize = 750)
  typeof pcFitSize !== 'number' && (pcFitSize = 2300)
  typeof pcMinWidth !== 'number' && (pcMinWidth = 750)

  let deviceWidth = getDeviceWidth()
  let fitSize = 0
  if (getDeviceIsMobile()) {
    fitSize = mobileFitSize
  } else {
    deviceWidth = Math.max(deviceWidth, pcMinWidth) // pc端设备宽度存在最小值
    fitSize = pcFitSize
  }
  document.documentElement.style.setProperty(
    'font-size',
    `${(deviceWidth / fitSize) * 100}px`,
    'important'
  )
}

export default {
  getDeviceType,
  getDeviceIsMobile,
  getDeviceDpr,
  getDeviceWidth,
  getDeviceHeight,
  calcDeviceRem
}
