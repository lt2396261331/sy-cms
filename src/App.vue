<template>
  <div class="app">
    <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { ElConfigProvider } from 'element-plus'
// import { ElButton } from 'element-plus'

export default defineComponent({
  name: 'App',
  component: {
    ElConfigProvider
  },
  data() {
    return {
      value: true,
      locale: zhCn
    }
  },
  components: {
    // ElButton
  }
})
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
