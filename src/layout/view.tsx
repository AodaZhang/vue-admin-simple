/**
 * @description tsx view创建
 * @author zhangxinyu 2021.03.10
 */
import {
  KeepAlive,
  Component as DynamicComponent,
  resolveDynamicComponent,
  Transition
} from 'vue'
import { RouterView } from 'vue-router'

/**
 * 1.jsx创建router-view：https://github.com/vuejs/jsx-next/issues/161#issuecomment-719628135
 * @param keepAlive 是否缓存
 * @param transitionName 过度className
 * @returns jsx
 */
export function createRouterView(
  keepAlive: boolean | unknown,
  transitionName?: string
): JSX.Element {
  return keepAlive === true ? (
    <RouterView>
      {({ Component }: { Component: DynamicComponent }) =>
        transitionName ? (
          <Transition name={transitionName} mode="out-in">
            <KeepAlive>{resolveDynamicComponent(Component)}</KeepAlive>
          </Transition>
        ) : (
          <KeepAlive>{resolveDynamicComponent(Component)}</KeepAlive>
        )
      }
    </RouterView>
  ) : (
    <RouterView>
      {({ Component }: { Component: DynamicComponent }) =>
        transitionName ? (
          <Transition name={transitionName} mode="out-in">
            {resolveDynamicComponent(Component)}
          </Transition>
        ) : (
          resolveDynamicComponent(Component)
        )
      }
    </RouterView>
  )
}
