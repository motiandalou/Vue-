<template>
  <div class="login">
    <div class="loginBox">
      <!-- login: -->
      <div class="loginImg">
        <img
          src="https://ftp.bmp.ovh/imgs/2021/06/aa9fd5cbe5f8f1a2.png"
          alt="login"
        />
      </div>
      <!-- form表单: -->
      <el-form label-width="60px" class="loginForm">
        <!-- 第一个是用户名: -->
        <el-form-item label="用户名:">
          <el-input prefix-icon="iconfont icon-yonghu-yuan"></el-input>
        </el-form-item>
        <!-- 第二个是密码: -->
        <el-form-item label="密 码:">
          <el-input prefix-icon="iconfont icon-mima"></el-input>
        </el-form-item>
        <!-- 第三个是确定 和重置按钮: -->
        <el-form-item class="buttons">
          <el-button type="primary">确定</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  methods: {},

  computed: {},

  watch: {},

  filters: {},

  beforeCreate() {},

  created() {},

  beforeMount() {},

  mounted() {},

  beforeUpdate() {},

  updated() {},

  beforeDestroy() {},

  destroyed() {},
};
</script>

<style lang="scss" scoped>
// 登录页面的背景样式:
.login {
  background-color: darkcyan;
  height: 100vh;
}
// 表单的框宽高样式:
.loginBox {
  width: 450px;
  height: 350px;
  background-color: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
}
// login样式:
.loginImg {
  height: 60px;
  width: 60px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 5px;
  box-shadow: 0 0 10px #dddddd;
  position: absolute;
  transform: translate(-15%, -15%);
  background-color: #ffffff;
}
// login图片样式:
.loginImg > img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-color: #eee;
}
// 表单的样式:
.loginForm{
    position: absolute;
    bottom: 30px;
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
}
</style>
