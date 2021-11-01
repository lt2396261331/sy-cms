<template>
  <div class="page-content">
    <hy-table
      :listData="dataList"
      :prop-list="contentTableConfig?.propList"
      v-bind="contentTableConfig"
    >
      <!-- 1.hander中插槽 -->
      <template #handerHandler>
        <el-button type="primary" size="medium">新建用户</el-button>
        <!-- <el-button icon="el-icon-refresh"></el-button> -->
      </template>
      <!-- 2.列中的插槽 -->
      <template #status="scope">
        <el-button size="mini" :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ $filters.formatTime(scope.row.updateAt) }}
      </template>
      <template #handler>
        <div class="handler-btns">
          <el-button icon="el-icon-edit" size="mini" type="text"
            >修改</el-button
          >
          <el-button icon="el-icon-delete" size="mini" type="text"
            >删除</el-button
          >
        </div>
      </template>

      <!-- <template #hander> 哈哈哈 </template> -->
    </hy-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

import hyTable from '@/base-ui/table'

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    hyTable
  },
  setup(props) {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    // const userCount = computed(() => store.state.system.userCount)

    return {
      dataList
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
