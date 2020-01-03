<template>
    <div class="container">
      <el-container>
        <el-aside width="10%">
          <div class="container-aside-title">YQCF-ADMIN</div>
          <side-bar :menuList="aside"></side-bar>
        </el-aside>
        <el-container>
          <el-header>
            <el-button @click="onLogout">退出登录</el-button>
          </el-header>
          <el-main>Main</el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
import SideBar from '@/components/sideBar/side-bar';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'index-page',
  components: {
    SideBar
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState('yqadmin/menu', [
      'aside'
    ])
  },
  methods: {
    ...mapActions('yqadmin/account', [
      'logout'
    ]),
    onLogout() {
      this.logout();
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: black;
    color: white;
  }
  .el-header {
    background-color: #071d1536;
     color: white;
  }
  &-aside {
    &-title {
      text-align: center;
      height: 59px;
      border-bottom: 1px solid #fff;
      line-height: 60px;
      font-size: 20px;
      background-color: rgb(48, 65, 86);
    }
  }
}
</style>
