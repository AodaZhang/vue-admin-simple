<template>
  <div class="flex-center">
    <a-result status="404" title="404" :sub-title="langRef['404.subTitle']">
      <template #extra>
        <a-button type="primary" @click="onClickHome">
          {{ langRef['404.button'] }}
        </a-button>
      </template>
    </a-result>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import useLocale from '@/hooks/useLocale'

export default defineComponent({
  name: '404',

  setup() {
    const router = useRouter()
    const { langRef } = useLocale()

    const onClickHome = () => router.push('/')

    return { langRef, onClickHome }
  }
})
</script>
