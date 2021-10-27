<template>
  <div class="login-phone" :model="iphone">
    <el-form abell-width="60px">
      <el-form-item label="手机号" prop="number">
        <el-input v-model="iphone.number" />
      </el-form-item>
      <el-form-item label="验证码" prop="verifyCode">
        <div class="get-code">
          <el-input v-model="iphone.verifyCode" />
          <el-button class="get-btn" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const iphone = reactive({
      number: '',
      verifyCode: ''
    })

    return {
      iphone
    }
  }
})
</script>

<style scoped lang="less">
.get-code {
  display: flex;
  .get-btn {
    margin-left: 8px;
  }
}
</style>
