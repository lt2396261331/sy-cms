<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      title="新建用户"
      width="30%"
      destroy-on-close
      center
    >
      <hy-form v-bind="modalConfig" v-model="formDate"></hy-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store'

import hyForm from '@/base-ui/form'

export default defineComponent({
  components: {
    hyForm
  },
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const formDate = ref<any>({})
    const dialogVisible = ref(false)

    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formDate.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    // 点击确定按钮的逻辑
    const store = useStore()
    const handleConfirmClick = () => {
      dialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        store.dispatch('system/eidtPageDataAction', {
          pageName: props.pageName,
          editData: { ...formDate.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 新建
        console.log('新建用户')
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formDate.value, ...props.otherInfo }
        })
      }
    }

    return {
      formDate,
      dialogVisible,
      handleConfirmClick
    }
  }
})
</script>

<style scoped></style>
