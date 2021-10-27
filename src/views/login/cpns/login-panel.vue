<template>
  <div class="login-panel">
    <h1 class="title">后台系统</h1>
    <el-tabs type="border-card" stretch>
      <el-tab-pane>
        <template #label>
          <span
            ><el-icon>
              <user-filled />
            </el-icon>
            账号登录</span
          >
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-phone />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="iskeepPasswrod">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-button" @click="handelLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
// import {} from 'element-plus/inco'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    const iskeepPasswrod = ref(false)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()

    const handelLoginClick = () => {
      accountRef.value?.loginAction()
    }

    return {
      iskeepPasswrod,
      handelLoginClick,
      accountRef
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 200px;
  width: 320px;
  .title {
    text-align: center;
  }

  .account-control {
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
  }

  .login-button {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
