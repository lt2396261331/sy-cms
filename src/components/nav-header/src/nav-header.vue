<template>
  <div class="nav-header">
    <i
      class="fold"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handelFoldClick"
    ></i>
    <div class="content">
      <hy-breadcrumb :breadcrumbs="breadcurmb" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './user-info.vue'
import hyBreadcrumb from '@/base-ui/breadcrumb/index'

import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'

export default defineComponent({
  components: {
    UserInfo,
    hyBreadcrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handelFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    // 面包屑数据： [{name: '', path: ''}]
    const store = useStore()

    const breadcurmb = computed(() => {
      const userMeuns = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMeuns, currentPath)
    })

    return {
      isFold,
      handelFoldClick,
      breadcurmb
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    flex: 1;
  }
}
</style>
