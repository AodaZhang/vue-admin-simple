<template>
  <div class="table">
    <a-form layout="inline" style="margin-bottom: 15px">
      <a-form-item label="用户名">
        <a-input v-model:value="formState.name" placeholder="请输入用户名">
          <template #prefix>
            <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" :disabled="formState.name === ''">
          查询
        </a-button>
      </a-form-item>
    </a-form>
    <a-button
      v-action:table="['add']"
      type="primary"
      style="margin-bottom: 15px"
      >新增</a-button
    >
    <a-table :columns="columns" :pagination="pagination" :data-source="state">
      <template #slotTitle>
        <span>
          <smile-outlined />
          名称
        </span>
      </template>
      <template #slotName="{ text }">
        <a>{{ text }}</a>
      </template>
      <template #slotTags="{ text }">
        <span>
          <a-tag
            v-for="tag in text"
            :key="tag"
            :color="
              tag === 'loser'
                ? 'volcano'
                : tag.length > 3
                ? 'geekblue'
                : 'green'
            "
          >
            {{ tag }}
          </a-tag>
        </span>
      </template>
      <template #slotAction>
        <span>
          <a>查看</a>
          <a-divider v-action:table="['del']" type="vertical" />
          <a v-action:table="['del']">删除</a>
        </span>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { SmileOutlined, UserOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'Table',

  components: {
    SmileOutlined,
    UserOutlined
  },

  setup() {
    const formState = reactive({ name: '' })
    const columns = reactive([
      {
        key: 'name',
        dataIndex: 'name',
        slots: { title: 'slotTitle', customRender: 'slotName' }
      },
      {
        key: 'age',
        dataIndex: 'age',
        title: '年龄'
      },
      {
        key: 'address',
        dataIndex: 'address',
        title: '地址'
      },
      {
        key: 'tags',
        dataIndex: 'tags',
        title: '标签',
        slots: { customRender: 'slotTags' }
      },
      {
        key: 'action',
        title: '操作',
        slots: { customRender: 'slotAction' }
      }
    ])
    const pagination = reactive({
      showSizeChanger: true,
      pageSize: 20
    })
    const state = reactive([
      {
        key: '1',
        name: '张全蛋',
        age: 32,
        address: '富土康1号流水线',
        tags: ['技术控', '无敌打工仔']
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser']
      },
      {
        key: '3',
        name: '曹操',
        age: 55,
        address: '河南洛阳',
        tags: ['枭雄', '一生之敌']
      }
    ])

    return {
      formState,
      columns,
      pagination,
      state
    }
  }
})
</script>

<style lang="less" scoped>
@import '~@/style/define.less';

.table {
  padding: 24px 32px;
  background-color: @--color-white;
}
</style>
