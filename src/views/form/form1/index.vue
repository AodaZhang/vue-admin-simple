<template>
  <a-form
    ref="formRef"
    :model="state"
    :rules="rules"
    :label-col="{ span: 7 }"
    :wrapper-col="{ span: 10 }"
  >
    <a-form-item label="活动名称" name="name">
      <a-input v-model:value="name" placeholder="请输入活动名称" />
    </a-form-item>
    <a-form-item label="活动地点" name="region">
      <a-select v-model:value="region" placeholder="请选择活动地点">
        <a-select-option value="上海">上海</a-select-option>
        <a-select-option value="北京">北京</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="活动时间" name="date">
      <a-date-picker
        v-model:value="date"
        show-time
        type="date"
        placeholder="请选择活动时间"
      />
    </a-form-item>
    <a-form-item label="活动状态" name="delivery">
      <a-switch v-model:checked="delivery" />
    </a-form-item>
    <a-form-item label="活动等级" name="rate">
      <a-rate v-model:value="rate" />
    </a-form-item>
    <a-form-item label="活动类型" name="type">
      <a-checkbox-group v-model:value="type">
        <a-checkbox value="1" name="type">线上</a-checkbox>
        <a-checkbox value="2" name="type">线下</a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="活动资源" name="resource">
      <a-radio-group v-model:value="resource">
        <a-radio value="1">赞助商</a-radio>
        <a-radio value="2">供应商</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="活动描述" name="desc">
      <a-textarea v-model:value="desc" placeholder="请输入活动描述" />
    </a-form-item>
    <a-row type="flex" justify="center">
      <a-button type="primary" @click="onSubmit">提交</a-button>
      <a-button style="margin-left: 10px" @click="onReset">重置</a-button>
    </a-row>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw, toRefs } from 'vue'
import { ValidateErrorEntity } from 'ant-design-vue/lib/form/interface'
import { Dayjs } from 'dayjs'

interface State {
  name: string
  region: string
  date?: Dayjs
  delivery: boolean
  rate: number
  type: string[]
  resource: string
  desc: string
}

export default defineComponent({
  name: 'Form1',

  setup() {
    const formRef = ref()
    const state = reactive<State>({
      name: null,
      region: null,
      date: null,
      delivery: false,
      rate: 0,
      type: [],
      resource: null,
      desc: null
    })
    const rules = reactive({
      name: [
        {
          required: true,
          message: '请输入活动名称',
          trigger: 'blur',
          type: 'string'
        },
        {
          message: '长度为3-5个字符',
          trigger: 'blur',
          type: 'string',
          min: 3,
          max: 5
        }
      ],
      region: [
        {
          required: true,
          message: '请选择活动地点',
          trigger: 'change',
          type: 'string'
        }
      ],
      date: [
        {
          required: true,
          message: '请选择活动日期',
          trigger: 'change',
          type: 'object'
        }
      ],
      type: [
        {
          required: true,
          message: '请选择活动类型',
          trigger: 'change',
          type: 'array'
        }
      ],
      resource: [
        {
          required: true,
          message: '请选择活动资源',
          trigger: 'change',
          type: 'string'
        }
      ],
      desc: [
        {
          required: true,
          message: '请输入活动描述',
          trigger: 'blur',
          type: 'string'
        }
      ]
    })

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log('values', toRaw(state))
        })
        .catch((error: ValidateErrorEntity<State>) => {
          console.log('error', error.values)
        })
    }

    const onReset = () => formRef.value.resetFields()

    return {
      ...toRefs(state),
      formRef,
      state,
      rules,
      onSubmit,
      onReset
    }
  }
})
</script>
