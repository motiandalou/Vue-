<template>
  <div class="home">
    <!--布局容器-->
    <el-container>
      <!--顶部栏-->
      <el-header>
        <div>
          <img src="https://ftp.bmp.ovh/imgs/2021/05/684c59686a76f389.jpg" />
          <span class="title">跃华公司后台管理系统</span>
        </div>
        <el-button type="success" @click="logout" size="mini"
          >退出按钮</el-button
        >
      </el-header>

      <el-container>
        <!--左侧侧边栏-->
        <el-aside width="200px">
          <!--左侧菜单区域-->
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <!--一级菜单-->
            <el-submenu index="1">
              <!-- 一级菜单的模板 -->
              <template slot="title">
                <!-- 菜单图标 -->
                <i class="el-icon-location"></i>
                <!-- 文本 -->
                <span>导航1</span>
              </template>

              <!-- 一级菜单下的二级菜单 -->
              <el-submenu index="1-4">
                <template slot="title">
                  <!-- 二级菜单图标 -->
                  <i class="el-icon-location"></i>
                  <!-- 二级菜单文本 -->
                  <span>二级菜单</span>
                </template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>

            </el-submenu>
          </el-menu>
        </el-aside>
        <!--主要区域容器-->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
    <!--布局容器-->
  </div>
</template>

<script>
export default {
  props: [],
  components: {},
  data() {
    return {
      loginObj: {
        username: "admin3",
        password: "123456",
      },
    };
  },
  methods: {
    //退出登录:
    logout() {
      //清空本地存储的数据:
      window.sessionStorage.clear();
      //跳转到登陆界面
      this.$router.push("/login");
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
// 后台管理系统字样的样式:
.title {
  color: white;
  font-size: 30px;
}
//布局容器:
.el-container {
  height: 100vh;
}
// 容器头部:
.el-header {
  background-color: #b3c0d1;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-header div {
  display: flex;
  align-items: center;
}
.el-header img {
  width: 50px;
  height: 50px;
  padding-right: 6px;
}
// 容器侧边栏:
.el-aside {
  background-color: #d3dce6;
  line-height: 400px;
}
// 容器主体部分:
.el-main {
  background-color: #e9eef3;
  line-height: 400px;
}
</style>
