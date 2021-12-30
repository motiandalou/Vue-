<template>
  <div>
    <div></div>

    <!-- 没有router-view,其他路由就进不来,APP就相当于百川汇于海.router-view就相当于关口,有了才能进来. -->
    <router-view></router-view>
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

<style lang="scss">
@import "./assets/css/reset.scss";
</style>
