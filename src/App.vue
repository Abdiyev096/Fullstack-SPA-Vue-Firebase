<template>
  <div id="app">
    <component :is="getLayout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'
export default {
  computed: {
    getLayout() {
      return this.$route.meta.layout ? this.$route.meta.layout : AuthLayout
    }
  },

  components: {
    AuthLayout,
    MainLayout
  }
}
</script>

<style lang="less">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/index.css';

</style>
