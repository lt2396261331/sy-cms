<template>
  <div class="menu">
    <page-countent
      :contentTableConfig="contentTableConfig"
      pageName="menu"
    ></page-countent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageCountent from '@/components/page-content'

import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'hy-menu',
  components: {
    PageCountent
  },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
