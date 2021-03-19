<template>
  <div class="form">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane v-for="(item, index) of tabs" :key="index" :tab="item">
        <router-view v-if="activeKey === 0" />
        <p v-else>{{ item }}</p>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Form',

  setup() {
    const activeKey = ref(0)
    const tabs = ref(['Tab1', 'Tab2'])

    return {
      activeKey,
      tabs
    }
  }
})
</script>

<style lang="less" scoped>
@import '~@/style/define.less';

.form {
  padding: 24px 32px;
  background-color: @--color-white;
}
</style>
