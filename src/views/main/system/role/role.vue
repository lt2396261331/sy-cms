<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-countent
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-countent>
    <page-modal
      pageName="role"
      :modalConfig="modalConfig"
      :otherInfo="otherInfo"
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name', disabled: '' }"
          @check="handleCheckChange"
        >
        </el-tree>
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'

import { useStore } from '@/store'

import { ElTree } from 'element-plus'

import { menuMapLeafKeys } from '@/utils/map-menus'

import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { modalConfig } from './config/modal.config'

import PageCountent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import PageModal from '@/components/page-modal'

import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  name: 'role',
  components: {
    PageCountent,
    PageSearch,
    PageModal
  },
  setup() {
    // 1.处理usePageModal的hook
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallBack = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        console.log(elTreeRef.value)
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined, editCallBack)
    const store = useStore()
    const menus = computed(() => store.state.entireMenu)

    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    return {
      contentTableConfig,
      searchFormConfig,
      modalConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef
    }
  }
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 25px;
}
</style>
