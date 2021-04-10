/**
 * @description dayjs使用
 * @author aodazhang 2021.04.10
 */
import { Dayjs } from 'dayjs'

/** 使用dayjs */
export default function useDayjs() {
  /** dayjs对象转字符串 */
  const dayjsTransformString = (
    day?: Dayjs | string,
    pattern?: string
  ): string | null => {
    pattern = pattern || 'YYYY-MM-DD'
    return (day as Dayjs)?.format(pattern) || null
  }
  return { dayjsTransformString }
}
