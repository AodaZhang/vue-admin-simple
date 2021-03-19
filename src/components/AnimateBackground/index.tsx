/**
 * @description 动画背景
 * @author zhangxinyu 2021.03.11
 */
import './style.less'

export default () => (
  <div class="animate-background">
    {Array(20)
      .fill(0)
      .map((_item, index) => (
        <span key={index}></span>
      ))}
  </div>
)
