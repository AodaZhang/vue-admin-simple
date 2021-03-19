<template>
  <div class="schedule">
    <a-calendar v-model:value="value">
      <template #dateCellRender="{ current: value }">
        <ul class="events">
          <li v-for="item in getListData(value)" :key="item.content">
            <a-badge :status="item.type" :text="item.content" />
          </li>
        </ul>
      </template>
    </a-calendar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Dayjs } from 'dayjs'

export default defineComponent({
  name: 'Schedule',

  setup() {
    const value = ref<Dayjs>()

    const getListData = (value: Dayjs) => {
      let listData
      switch (value.date()) {
        case 8:
          listData = [
            { type: 'warning', content: '项目上线' },
            { type: 'success', content: '需求沟通会' }
          ]
          break
        case 10:
          listData = [
            { type: 'warning', content: '项目上线' },
            { type: 'success', content: 'UI评审会' },
            { type: 'error', content: '迭代延期' }
          ]
          break
        case 15:
          listData = [
            { type: 'warning', content: '迭代deadline' },
            { type: 'success', content: '中午去肯德基' },
            { type: 'error', content: '今晚加班' }
          ]
          break
        default:
      }
      return listData || []
    }

    return {
      value,
      getListData
    }
  }
})
</script>

<style lang="less" scoped>
@import '~@/style/define.less';

.schedule {
  padding: 24px 32px;
  background-color: @--color-white;
}
</style>
