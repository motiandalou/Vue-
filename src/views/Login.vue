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
      <el-form
        ref="loginFormRef"
        :model="formData"
        :rules="rules"
        label-width="80px"
        class="loginForm"
      >
        <!-- 第一个是用户名: -->
        <el-form-item label="用户名:">
          <el-input
            v-model="formData.username"
            prefix-icon="iconfont icon-yonghu-yuan"
            placeholder="请输入您的用户名"
          ></el-input>
        </el-form-item>
        <!-- 第二个是密码: -->
        <el-form-item label="密 码:">
          <el-input
            v-model="formData.password"
            type="password"
            placeholder="请输入您的密码"
            prefix-icon="iconfont icon-mima"
          ></el-input>
        </el-form-item>
        <!-- 第三个是确定 和重置按钮: -->
        <el-form-item class="buttons">
          <el-button type="primary" @click="login">确定</el-button>
          <el-button type="info" @click="reset">重置</el-button>
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
    return {
      formData: {
        username: "",
        password: "",
      },
      //定义表单规则:
      rules: {
        //用户名规则:
        username: [
          //required 必填
          //message 信息提示
          //trigger 鼠标失去焦点时触发
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        //密码规则:
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //重置密码和用户名:
    //reset() {},
    //输入用户名和密码点击确定,之后的逻辑
    login() {
      // console.log("开始登录...");
      this.$refs.loginFormRef.validate( async(valid) => {
        //valid:返回的是一个布尔值,表单验证提交是否成功
        console.log(valid);
        if (!valid) return;
        //表单验证提交成功，在这里写请求后端的逻辑
        //async await好处:将异步请求,变成同步等待.await没有走完,下面的代码也不会走.第一节省性能,第二:console.log()优先级最高,上来就打印,那肯定是没有res的.会报错.
        const res =  await this.$http.get("/api/login", { params: this.formData });
          console.log('res',res)
        if (res.data.code != 1) {
          return this.$message.error("登陆失败！");
        }
        this.$message.success("登陆成功！");
        //登录了,存下后端返回的cookies:
        window.sessionStorage.setItem("token", res.data.token);
        this.$router.push("/home");
      });
    },
  },

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
.loginForm {
  position: absolute;
  bottom: 30px;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
}
</style>
