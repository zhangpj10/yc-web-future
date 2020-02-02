<template>
    <div class="container">
      <el-container>
        <el-header>
          <div class="container-header">
            <div class="container-header-title">
              <span :class="asideCollapse ? 'el-icon-s-unfold': 'el-icon-s-fold'" class="container-header-title__btn" @click="asideCollapseToggle"></span>
              <span>YQCF-后台管理</span>
            </div>
            <div class="container-header-info">
              <div>
                <span class="container-header-info__zoom" :title="active ? '取消全屏' : '全屏'" @click="toggle" :class="active ? 'el-icon-zoom-out' : 'el-icon-zoom-in'"></span>
              </div>
              <div><el-avatar icon="el-icon-user"></el-avatar></div>
              <div>
                <el-dropdown>
                  <span class="el-dropdown-link">
                    {{ info.username }}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="onLogout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </div>
        </el-header>
        <el-container>
          <el-aside :width="asideCollapse ? '48px' : '250px'">
            <side-bar :menuList="aside" :isCollapse="asideCollapse"></side-bar>
          </el-aside>
          <el-container>
            <el-main class="container-main">
              <!--用户信息卡片-->
              <user-card></user-card>
            </el-main>
            <el-footer>Footer</el-footer>
          </el-container>
        </el-container>
      </el-container>
    </div>
</template>

<script>
import SideBar from '@/components/sideBar/side-bar';
import { mapState, mapActions } from 'vuex';
import UserCard from "./user-card";
import screenfull from 'screenfull';

export default {
  name: 'index-page',
  components: {
    UserCard,
    SideBar
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState('yqadmin/menu', [
      'aside', 'asideCollapse'
    ]),
    ...mapState('yqadmin/user', [
      'info'
    ]),
    ...mapState('yqadmin/fullscreen', [
      'active'
    ])
  },
  methods: {
    ...mapActions('yqadmin/account', [
      'logout'
    ]),
    ...mapActions('yqadmin/menu', [
      'asideCollapseToggle'
    ]),
    ...mapActions('yqadmin/fullscreen', [
      'toggle'
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
  &-header {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    justify-content: space-between;
    padding: 14px;
    &-title {
      width: 50%;
      font-size: 24px;
      &__btn {
        padding-right: 5px;
        cursor: pointer;
      }
    }
    &-info {
      display: flex;
      width: 50%;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: flex-end;
      padding-right: 10px;
      &>div {
        margin-right: 10px;
      }
      &__zoom {
        font-size: 35px;
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
  &-main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row wrap;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: black;
    color: white;
  }
  .el-header {
    background-color: #896bff;
    color: white;
  }
  .el-avatar {
    background-color: #3a8ee6;
  }
  .el-dropdown {
    color: #fff;
  }
  .el-card__body {
    width: 100%;
  }
}
</style>
