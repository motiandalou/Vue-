<template>
  <div>
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片区-->
    <el-card class="box-card">
      <!-- gutter="20" 列与列之间的间隔
      :span="8"  具体列的所占有的宽度（24为整个屏幕宽度）-->
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 增删改查:查 -->
          <el-input
            v-model="queryInfo.query"
            :clearable="true"
            @clear="getUserList"
            placeholder="请输入内容"
          >
            <el-button
              @click="search"
              slot="append"
              icon="el-icon-search"
            ></el-button
          ></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="insertUsers">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 序号  用户名 手机 邮箱 角色 状态-->
      <el-table :data="userList" style="width: 100%;">
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column
          label="用户名"
          prop="UserName"
          width="100"
        ></el-table-column>
        <el-table-column
          label="手机"
          prop="Mobile"
          width="180"
        ></el-table-column>
        <el-table-column
          label="邮箱"
          prop="Email"
          width="180"
        ></el-table-column>
        <el-table-column
          label="角色"
          prop="RoleName"
          width="100"
        ></el-table-column>
        <el-table-column label="状态" prop="MgState" width="100">
          <!-- 作用域插槽:员工状态,比如说离职,在职 -->
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.MgState"
              active-color="#13ce66"
              inactive-color="#ddd"
              @change="userStateChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <!-- 往行中插入新的列内容用template包裹 -->
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              @click="updateUserDialog(scope.row)"
              >修改</el-button
            >
            <el-button type="info" size="mini" @click="deleteUser(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页效果 -->
      <!-- 
        current-page:当前第几页,默认第一页
        page-size:每页显示多少条数据
        total:员工总数量
        page-sizes:选项里面的:5条每页
       -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 增删改查:增 -->
    <el-dialog
      title="添加用户信息"
      :visible.sync="addUserDialogVisible"
      width="40%"
      @close="addDialogClosed"
    >
      <!-- 
      :rules="addFormRules" :点击添加用户,里面输入校验的规则
    -->
      <el-form
        ref="addFormRef"
        :rules="addFormRules"
        :model="addForm"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="enter">确定</el-button>
      </span>
    </el-dialog>

    <!--增删改查:改--修改用户信息对话框-->
    <el-dialog
      title="修改用户信息"
      :visible.sync="updateUserDialogVisible"
      width="40%"
      @close="updateDialogClosed"
    >
      <el-form
        ref="updateFormRef"
        :rules="addFormRules"
        :model="updateForm"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="updateForm.username"></el-input>
        </el-form-item>
        <!-- 密码禁止修改:disabled -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="updateForm.password" disabled></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="updateForm.email"></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="mobile">
          <el-input v-model="updateForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "user",
  props: [],
  components: {},
  data() {
    return {
      queryInfo: { query: "", pagenum: 1, pagesize: 10 },
      userList: [],
      total: 0,
      //增删改查:改
      updateUserDialogVisible: false,
      //增删改查:增
      addUserDialogVisible: false,
      //增删改查:增
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      //增删改查:改
      updateForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
        id: "",
      },
      //addForm里面的校验规则:
      addFormRules: {
        username: [
          //required 必填
          //message 信息提示
          //trigger 鼠标失去焦点时触发
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: "输入正确的邮箱",
            trigger: "blur",
          },
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
      },
    };
  },
  //方法 函数写这里
  methods: {
    async getUserList() {
      const res = await this.$http.get("/api/users", {
        params: this.queryInfo,
      });
      this.userList = res.data.data;
      this.total = res.data.total;
      //测试后端返回的数据:
      // console.log("后端数据:", res);
    },
    //监听pagesize改变的事件
    handleSizeChange(newsize) {
      this.queryInfo.pagesize = newsize;
      this.getUserList();
    },
    //监听PageNume改变的事件
    handleCurrentChange(newpage) {
      this.queryInfo.pagenum = newpage;
      this.getUserList();
    },
    //switch 状态发生变化时的回调函数
    //后端返回的参数:code,newState
    async userStateChanged(userinfo) {
      const res = await this.$http.get("/api/userUpdate", { params: userinfo });
      if (res.data.code != 200) {
        alert("请求失败更新");
        return;
      }
      this.$message.success(
        "状态信息已经修改成功！目前的状态的值为：" + res.data.newState
      );
    },
    //增删改查:查
    async search() {
      if (!this.queryInfo.query) {
        // 性能优化--减少请求后端次数:
        this.$message({
          showClose: true,
          message: "搜索不能为空!",
          type: "warning",
        });
        return;
      }
      const res = await this.$http.get("/api/userSearch", {
        params: this.queryInfo,
      });
      this.userList = res.data.data;
    },
    //增删改查:增
    insertUsers() {
      //改变对话框状态:true才显示
      this.addUserDialogVisible = true;
    },
    //增删改查:增里面的全部验证都通过
    //点击确定触发
    enter() {
      //往addForm添加一些属性
      this.addForm.pagenum = this.queryInfo.pagenum;
      this.addForm.pagesize = this.queryInfo.pagesize;
      this.$refs.addFormRef.validate(async (valid) => {
        if (valid) {
          const res = await this.$http.get("/api/adduser", {
            params: this.addForm,
          });

          this.userList = res.data.data;
          this.total = res.data.total;
          this.addUserDialogVisible = false;
        }
      });
    },
    //当添加用户时:对话框点击取消时候清空之前输入的内容:
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    //增删改查:改
    updateUserDialog(userInfo) {
      this.updateUserDialogVisible = true;
      this.updateForm.id = userInfo.id;
      this.updateForm.username = userInfo.UserName;
      this.updateForm.password = userInfo.Password;
      this.updateForm.email = userInfo.Email;
      this.updateForm.mobile = userInfo.Mobile;
    },
    //监听修改用户对话框关闭事件--点击修改后的弹出框消失后,清除修改内容
    updateDialogClosed() {
      this.$refs.updateFormRef.resetFields();
    },
    //修改用户信息点确定之后:
    updateUser() {
      this.updateForm.pagenum = this.queryInfo.pagenum;
      this.updateForm.pagesize = this.queryInfo.pagesize;
      this.$refs.updateFormRef.validate(async (valid) => {
        if (valid) {
          const res = await this.$http.get("/api/updateuser", {
            params: this.updateForm,
          });
          //后端返回数据:
          this.userList = res.data.data;
          this.total = res.data.total;
          //弹出框消失:
          this.updateUserDialogVisible = false;
        }
      });
    },
    //增删改查:删
    async deleteUser(id) {
      var idInt = "id";
      var idVal = id;
      this.queryInfo[idInt] = idVal;
      var res = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => {
        return err;
      });
      //console.log(res)
      if (res != "confirm") return this.$message.info("删除用户已取消");
      const resData = await this.$http.get("/api/deleteuser", {
        params: this.queryInfo,
      });

      this.getUserList();
      this.$message.info("删除用户成功");
      this.userList = resData.data.data;
      this.total = resData.data.total;
    },
  },
  //计算属性
  computed: {},
  //侦听器
  watch: {},
  //过滤器
  filters: {},
  //以下是生命周期
  //组件创建之前
  beforeCreate() {},
  //组件创建之后
  created() {
    this.getUserList();
  },
  //页面渲染之前
  beforeMount() {},
  //页面渲染之后
  mounted() {},
  //页面视图数据更新之前
  beforeUpdate() {},
  //页面视图数据更新之后
  updated() {},
  //页面销毁之前
  beforeDestroy() {},
  //页面销毁之后
  destroyed() {},
};
</script>

<style lang="scss" scoped>
// 卡片:
.el-card {
  margin-top: 15px;
  box-shadow: 0 1px 1px #353333;
}
//面包屑字体的大小:
.el-breadcrumb {
  font-size: 14px;
}
//底部分页的样式:
.el-pagination {
  margin-top: 10px;
  text-align: center;
}
</style>
