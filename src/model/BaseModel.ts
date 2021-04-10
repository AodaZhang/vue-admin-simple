/**
 * @description 基类
 * @author aodazhang 2021.04.09
 */

/** 基类 */
export default class BaseModel {
  /**
   * 1.更新数据
   * @param data 数据源
   * @returns 无
   */
  protected update(data: unknown): void {
    if (!data || !(data instanceof Object)) {
      return
    }
    for (const [key, value] of Object.entries(data)) {
      if (!Reflect.ownKeys(this).includes(key) || value == null) {
        continue
      }
      Reflect.set(this, key, value)
    }
  }
}
