<template>
  <page-layout>
    <router-view />
  </page-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Form',

  setup() {
    const activeKeyRef = ref(0)
    const tabsRef = ref(['Tab1', 'Tab2'])

    return {
      activeKeyRef,
      tabsRef
    }
  }
})
</script>
