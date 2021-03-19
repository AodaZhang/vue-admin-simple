/**
 * @description 数据模型类
 * @author aodazhang 2021.03.09
 */

/** 基类 */
export class BaseModel {
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
      if (!Reflect.hasOwnProperty.call(this, key) || value == null) {
        continue
      }
      ;(this as any)[key] = value
    }
  }
}
