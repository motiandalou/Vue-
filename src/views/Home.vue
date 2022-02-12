<template>
  <div class="home">
    <!--布局容器-->
    <el-container>
      <!--顶部栏-->
      <el-header>
        <div>
          <img src="https://ftp.bmp.ovh/imgs/2021/05/684c59686a76f389.jpg" />
          <span class="title">跃华公司后台管理</span>
        </div>
        <el-button type="success" @click="logout" size="mini">退出</el-button>
      </el-header>

      <!-- 中间部分: -->
      <el-container>
        <!--左侧侧边栏-->
        <el-aside class="aside" :width="isOpen ? '40px' : '200px'">
          <!--左侧菜单区域-->
          <div @click="switchMenu" class="toggleBtn">
            <i :class="isOpen ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>
          </div>
          <!-- :unique-opened="true":点开一个其他自动关闭  -->
          <!-- :router="true":实现elementUi 的按钮对页面的路由映射   -->
          <el-menu
            default-active="2"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :unique-opened="true"
            :router="true"
          >
            <!--一级菜单-->
            <!-- :index="item.id + ''":不加,点击第一级全部子级都出来了 -->
            <el-submenu
              :index="item.id + ''"
              v-for="item in menulist"
              :key="item.id"
            >
              <!-- 一级菜单的模板 -->
              <!-- slot="title" :具名插槽传值 -->
              <template slot="title">
                <!-- 菜单图标 -->
                <i :class="iconObj[item.name]"></i>
                <!-- 文本 -->
                <span>{{ item.name }}</span>
              </template>

              <!-- 一级菜单下的二级菜单 -->
              <!-- 从el-submenu改成el-menu-item -->
              <el-menu-item
                :index="subitem.path"
                v-for="subitem in item.child"
                :key="subitem.id"
              >
                <template slot="title">
                  <!-- 二级菜单图标 -->
                  <i :class="iconObj[subitem.name]"></i>
                  <!-- 二级菜单文本 -->
                  <span>{{ subitem.name }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!--左侧侧边栏-->
        <!--主要区域容器-->
        <el-main>
          <!-- 将内容Main改成路由入口: -->
          <router-view></router-view>
        </el-main>
        <!--主要区域容器-->
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
      //侧边栏菜单数据:
      menulist: [],
      //icon图标:菜单管理
      iconObj: {
        "用户管理": "iconfont icon-yonghuguanli",
        "用户列表": "iconfont icon-yuangongliebiao",
        "商品列表": "iconfont icon-shangpinliebiao",
        "订单管理": "iconfont icon-dingdanguanli",
        "数据统计": "iconfont icon-shujutongji",
        "员工列表": "iconfont icon-yonghuguanli",
        "员工管理": "iconfont icon-yuangongliebiao",
        "分类参数": "iconfont icon-shangpinliebiao",
        "商品管理": "iconfont icon-shangpinliebiao",
        "商品分类": "iconfont icon-shangpinliebiao",
      },
      isOpen: false,
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
    //动态渲染侧边栏菜单的数据:
    async getMenus() {
      const res = await this.$http.get("/api/menu");
      console.log(res.data);
      if (!res.status == "ok") return;
      this.menulist = res.data.data;
    },
    //点击改变侧边栏的拉伸和收缩状态:
    switchMenu() {
      this.isOpen = !this.isOpen;
    },
  },

  computed: {},

  watch: {},

  filters: {},

  beforeCreate() {},

  created() {
    //最早存放数据的地方:
    this.getMenus();
  },

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
//icon图标和字体的间距:
.iconfont {
  margin-right: 10px;
}
//解决:背景的交接处多了1px的空间
.el-menu {
  border-right: none;
}
// 侧边栏左上角收缩扩展的功能:
.toggleBtn {
  line-height: 24px;
  color: #fff;
  text-align: left;
  font-size: 16px;
  padding-left: 10px;
  cursor: pointer;
  background-color: darkcyan;
}
//侧边栏左上角收缩动画:
.aside {
  transition: all 0.3s ease;
}
//改变入口组件的样式:
.el-main {
  background-color: #e9eef3 ;
  line-height: 0px ;
}
</style>
