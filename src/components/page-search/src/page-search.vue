<template>
  <div class="page-search">
    <div class="search">
      <hy-form v-bind="searchFormConfig" v-model="formData">
        <template #header>
          <h2 class="header">高级检索</h2>
        </template>
        <template #footer>
          <div class="handler-btns">
            <el-button
              type="primary"
              icon="el-icon-refresh"
              @click="handleResetClick"
              >重置</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="handleQueryClick"
              >搜索</el-button
            >
          </div>
        </template>
      </hy-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import HyForm from '@/base-ui/form'

export default defineComponent({
  components: {
    HyForm
  },
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 双向绑定的属性应该有配置文件中的field来决定
    // 1.优化：formdata中的属性应该动态决定
    const formItems = props.searchFormConfig.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)
    console.log(formData)
    // 2.优化二：当用户点击了重置按钮
    const handleResetClick = () => {
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key]
      }
      // formDate.value = formOriginData
      emit('resetBtnClick')
    }

    // 3.优化三：当用户点击搜索
    const handleQueryClick = () => {
      console.log('点击了搜索')
      emit('queryBtnClick', formData.value)
    }

    return { formData, handleResetClick, handleQueryClick }
  }
})
</script>

<style scoped>
.header {
  color: yellowgreen;
}

.handler-btns {
  text-align: right;
  padding: 0 20px 20px 0;
}
</style>
