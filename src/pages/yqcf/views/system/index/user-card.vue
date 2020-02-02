<template>
  <div class="user">
    <el-card class="user-card">
      <div class="user-card__row1">
        <el-avatar :size="150" icon="el-icon-user"></el-avatar>
        <div>
          <span>
            {{info.username}}
          </span>
          <span>
            {{info.rolename}}
          </span>
        </div>
      </div>
      <div class="user-card__row2"></div>
      <div class="user-card__row3">
        <span>当前时间</span>
        <span>2020-02-02 02:02:02</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'user-card',
  computed: {
    ...mapState('yqadmin/user', [
      'info'
    ])
  }
}
</script>

<style scoped lang="scss">
  .user {
    width: 23%;
    min-width: 400px;
    &-card {
       display: flex;
       flex-flow: row nowrap;
       width: 100%;
       justify-content: center;
       align-items: center;
       align-content: center;
       &__row1 {
         width: 100%;
         display: flex;
         flex-flow: row nowrap;
         align-items: center;
         font-size: 48px;
         &>div {
           display: flex;
           flex-flow: column;
           justify-content: center;
           align-items: center;
           padding: 5%;
           margin-left: 20px;
           &>span:last-child {
             font-size: 20px;
             color: #c9b6af;
            }
          }
         &>.el-avatar--icon {
           font-size: 100px;
         }
       }
      &__row2 {
         border: 2px solid #8c939d;
         width: 100%;
         margin-top: 20px;
       }
      &__row3 {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #8c939d;
        flex-flow: row nowrap;
        margin-top: 20px;
        width: 100%;
      }
    }
  }
  .el-avatar {
    background-color: #3a8ee6;
  }
</style>
