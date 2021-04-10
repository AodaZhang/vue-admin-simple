<template>
  <table-layout
    :btnConfig="layout.btnConfig"
    @searchSubmit="onClickSubmit"
    @searchReset="onClickReset"
    @btnExport="onClickExport"
    @btnImport="onClickImport"
    @btnDownload="onClickDownload"
  >
    <template #search>
      <a-row :gutter="[16, 16]">
        <a-col class="flex-end" :span="3">活动日期</a-col>
        <a-col :span="5">
          <a-date-picker
            v-model:value="search.activityDate"
            allowClear
            showToday
            mode="date"
            placeholder="请选择活动日期"
          />
        </a-col>
        <a-col class="flex-end" :span="3">活动平台</a-col>
        <a-col :span="5">
          <a-select
            v-model:value="search.activityPlatform"
            allowClear
            showSearch
            placeholder="请选择活动平台"
          >
            <a-select-option value="1">支付宝</a-select-option>
            <a-select-option value="2">微信</a-select-option>
          </a-select>
        </a-col>
        <a-col class="flex-end" :span="3">活动序号</a-col>
        <a-col :span="5">
          <a-input
            v-model:value="search.activityId"
            allowClear
            placeholder="请输入活动序号"
          />
        </a-col>
        <a-col class="flex-end" :span="3">活动名称</a-col>
        <a-col :span="5">
          <a-input
            v-model:value="search.activityName"
            allowClear
            placeholder="请输入活动名称"
          />
        </a-col>
      </a-row>
    </template>
    <template #list>
      <a-table
        :row-key="layout.rowKey"
        :columns="layout.columns"
        :pagination="layout.pagination"
        :loading="layout.loading"
        :data-source="list"
        @change="onChangeList"
        bordered
      >
        <template #tag="{ text }">
          <span>
            <a-tag v-for="(item, index) of text" :key="index" color="geekblue">
              {{ item }}
            </a-tag>
          </span>
        </template>
        <template #action>
          <span>
            <a @click="onClickCheck">查看</a>
            <a-divider v-action:table="['del']" type="vertical" />
            <a v-action:table="['del']" class="del" @click="onClickDelete">
              删除
            </a>
          </span>
        </template>
      </a-table>
    </template>
  </table-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { notification } from 'ant-design-vue'
import useDayjs from '@/hooks/useDayjs'
import { activity, RESPONSE_CODE } from '@/api'
import { ActivityInfoModel } from '@/model'
import { State, layout, search } from './data'

export default defineComponent({
  name: 'Table',

  setup() {
    const { dayjsTransformString } = useDayjs()
    const state = reactive<State>({
      layout,
      search: { ...search },
      list: []
    })

    // [事件]1.查询
    const onClickSubmit = () => {
      loadDataWithList()
    }
    // [事件]2.重置
    const onClickReset = () => {
      state.search = { ...search }
      loadDataWithList()
    }
    // [事件]3.列表pagination变化
    const onChangeList = (pagination: Layout.Pagination) => {
      state.layout.pagination.pageSize = pagination.pageSize
      state.layout.pagination.current = pagination.current
      loadDataWithList(false)
    }
    // [事件]4.导出
    const onClickExport = () =>
      notification.success({
        message: '导出',
        description: '请添加对应导出逻辑'
      })
    // [事件]5.导入
    const onClickImport = () =>
      notification.info({
        message: '导入',
        description: '请添加对应导入逻辑'
      })
    // [事件]6.下载
    const onClickDownload = () =>
      notification.warning({
        message: '下载',
        description: '请添加对应下载逻辑'
      })
    // [事件]7.查看
    const onClickCheck = () =>
      notification.info({
        message: '查看',
        description: '请添加对应查看逻辑'
      })
    // [事件]8.删除
    const onClickDelete = () =>
      notification.error({
        message: '删除',
        description: '请添加对应删除逻辑'
      })

    // [网络]活动列表数据
    const loadDataWithList = async (isReset = true) => {
      try {
        if (isReset) {
          state.layout.pagination.total = 0
          state.layout.pagination.current = 1
          state.list = []
        }
        state.layout.loading = true
        const { code, errMsg, data } = await activity.getList({
          ...state.search,
          activityDate: dayjsTransformString(state.search.activityDate),
          pageSize: layout.pagination.pageSize,
          current: layout.pagination.current
        })
        if (code !== RESPONSE_CODE.NORMAL) {
          throw new Error(errMsg)
        }
        const { total, list } = data || {}
        state.layout.pagination.total = total
        state.list = list.map(item => new ActivityInfoModel(item))
      } catch (error) {
      } finally {
        state.layout.loading = false
      }
    }

    onMounted(() => {
      loadDataWithList()
    })

    return {
      ...toRefs(state),
      onClickSubmit,
      onClickReset,
      onChangeList,
      onClickExport,
      onClickImport,
      onClickDownload,
      onClickCheck,
      onClickDelete
    }
  }
})
</script>
