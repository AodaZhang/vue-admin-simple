<template>
  <a-form
    ref="formRef"
    :model="state"
    :rules="rules"
    :label-col="{ span: 7 }"
    :wrapper-col="{ span: 10 }"
  >
    <a-form-item label="活动名称" name="name">
      <a-input v-model:value="name" />
    </a-form-item>
    <a-form-item label="活动地点" name="region">
      <a-select v-model:value="region" placeholder="请选择活动地点">
        <a-select-option value="上海">上海</a-select-option>
        <a-select-option value="北京">北京</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="活动时间" name="date">
      <a-date-picker
        style="min-width: 100%; width: 100%"
        v-model:value="date"
        show-time
        type="date"
        placeholder="请选择日期"
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
      <a-textarea
        style="min-height: 100px"
        v-model:value="desc"
        placeholder="请输入活动描述"
      />
    </a-form-item>
    <a-row type="flex" justify="center" align="top">
      <a-button type="primary" @click="onSubmit">提交</a-button>
      <a-button style="margin-left: 10px" @click="onReset">重置</a-button>
    </a-row>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw, toRefs } from 'vue'
import { Dayjs } from 'dayjs'
import { ValidateErrorEntity } from 'ant-design-vue/lib/form/interface'

interface FormState {
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
    const state = reactive<FormState>({
      name: '',
      region: '',
      date: null,
      delivery: false,
      rate: 0,
      type: [],
      resource: '',
      desc: ''
    })
    const rules = reactive({
      name: [
        {
          required: true,
          message: '请输入活动名称',
          trigger: 'blur'
        },
        { message: '长度为3-5个字符', trigger: 'blur', min: 3, max: 5 }
      ],
      region: [
        {
          required: true,
          message: '请选择活动地点',
          trigger: 'change'
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
          trigger: 'change'
        }
      ],
      desc: [
        {
          required: true,
          message: '请输入活动描述',
          trigger: 'blur'
        }
      ]
    })

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log('values', toRaw(state))
        })
        .catch((error: ValidateErrorEntity<FormState>) => {
          console.log('error', error.values)
        })
    }

    const onReset = () => {
      formRef.value.resetFields()
    }

    return {
      formRef,
      state,
      ...toRefs(state),
      rules,
      onSubmit,
      onReset
    }
  }
})
</script>
