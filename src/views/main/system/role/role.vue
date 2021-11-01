<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-countent
      :contentTableConfig="contentTableConfig"
      pageName="role"
    ></page-countent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'

import PageCountent from '@/components/page-content'
import PageSearch from '@/components/page-search'

export default defineComponent({
  name: 'role',
  components: {
    PageCountent,
    PageSearch
  },
  setup() {
    return {
      contentTableConfig,
      searchFormConfig
    }
  }
})
</script>

<style scoped></style>
