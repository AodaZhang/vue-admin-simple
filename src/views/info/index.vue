<template>
  <div class="info">
    <a-descriptions
      :title="title"
      bordered
      :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
    >
      <a-descriptions-item label="账号">{{ name }}</a-descriptions-item>
      <a-descriptions-item label="密码">12345</a-descriptions-item>
      <a-descriptions-item label="系统语言">{{ keyRef }}</a-descriptions-item>
      <a-descriptions-item label="权限">
        <a-tag v-if="name !== 'viewer'" color="success">查看所有页面</a-tag>
        <a-tag v-if="name !== 'viewer'" color="success">执行所有操作</a-tag>
        <a-tag v-if="name === 'viewer'" color="warning">不能查看表单1</a-tag>
        <a-tag v-if="name === 'viewer'" color="warning">
          不能在表格中执行新增、删除
        </a-tag>
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import dayjs from 'dayjs'
import useLocale from '@/hooks/useLocale'

export default defineComponent({
  name: 'info',

  setup() {
    const store = useStore<Vuex.RootState>()
    const { keyRef } = useLocale()

    const title = computed(
      () => `${dayjs().format('A')}好，${store.state.user.info.name}`
    )
    const name = computed(() => store.state.user.info.name)

    return {
      keyRef,
      title,
      name
    }
  }
})
</script>

<style lang="less" scoped>
@import '~@/style/define.less';

.info {
  padding: 24px 32px;
  background-color: @--color-white;
}
</style>
