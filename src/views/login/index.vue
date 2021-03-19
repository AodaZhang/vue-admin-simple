<template>
  <a-form class="login" layout="horizontal" :wrapper-col="{ span: 24 }">
    <a-form-item v-bind="validateInfos.username">
      <a-input
        :placeholder="langRef['login.username']"
        size="large"
        v-model:value="username"
      >
        <template #prefix>
          <user-outlined />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item v-bind="validateInfos.password">
      <a-input-password
        :placeholder="langRef['login.password']"
        size="large"
        v-model:value="password"
        @keyup.enter="onClickLogin"
      >
        <template #prefix>
          <lock-outlined />
        </template>
      </a-input-password>
    </a-form-item>
    <a-button
      type="primary"
      block
      size="large"
      :loading="isLoading"
      @click.prevent="onClickLogin"
    >
      {{ langRef['login.button'] }}
    </a-button>
    <a-form-item style="color: #fff; text-align: center">
      {{ langRef['login.tip'] }}
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useForm } from '@ant-design-vue/use'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import useLocale from '@/hooks/useLocale'

interface StateRef {
  isLoading: boolean
  username: string
  password: string
}

export default defineComponent({
  name: 'Login',

  components: { UserOutlined, LockOutlined },

  setup() {
    const router = useRouter()
    const store = useStore<Vuex.RootState>()
    const { langRef } = useLocale()
    const stateRef = reactive<StateRef>({
      isLoading: false,
      username: '',
      password: ''
    })
    const rulesRef = reactive({
      username: [{ required: true, message: '请输入账号' }],
      password: [{ required: true, message: '请输入密码' }]
    })

    const { validateInfos, validate } = useForm(stateRef, rulesRef)

    const onClickLogin = async () => {
      try {
        const payload = await validate<StateRef>()
        stateRef.isLoading = true
        await store.dispatch('user/login', payload)
        stateRef.isLoading = false
        router.push('/')
      } catch (error) {
        stateRef.isLoading = false
      }
    }

    return {
      ...toRefs(stateRef),
      langRef,
      validateInfos,
      onClickLogin
    }
  }
})
</script>
