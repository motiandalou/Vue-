<template>
  <div>
    <button @click="login">点击请求数据</button>
  </div>
</template>

<script>
export default {
  props: [],
  components: {},
  data() {
    return {
      loginObj: {
        username: "admin",
        password: "123456",
      },
    };
  },
  methods: {
    login() {
      this.$http.get("/api/login", { params: this.loginObj }).then((res) => {
        console.log(res);
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

<style lang="scss" scoped></style>
