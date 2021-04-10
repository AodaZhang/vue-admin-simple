/**
 * @description 普通页面Layout
 * @author aodazhang 2021.04.10
 */
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageLayout',

  setup(_props, ctx) {
    return () =>
      ctx.slots.default && (
        <div style="padding:24px;background-color:#fff;">
          {ctx.slots.default()}
        </div>
      )
  }
})
