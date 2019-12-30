<template>
    <div class="container">
      <el-container>
        <el-aside width="auto">
          <side-bar :menuList="menuList"></side-bar>
        </el-aside>
        <el-container>
          <el-header>Header</el-header>
          <el-main>Main</el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
import SideBar from '@/components/sideBar/side-bar';

export default {
  name: 'index-page',
  components: {
    SideBar
  },
  data() {
    return {
      menuList: [
          {
            "path": "/func1",     //菜单项所对应的路由路径
            "title": "功能1",     //菜单项名称
            "children":[]        //是否有子菜单，若没有，则为[]
          },
          {
            "path": "/func2",
            "title": "功能2",
            "children":[]
          },
          {
            "path": "/func3",
            "title": "功能3",
            "children": [
              {
                "path": "/func31",
                "title": "功能3-1",
                "children":[]
              },
              {
                "path": "/func32",
                "title": "功能3-2",
                "children":[]
              },
              {
                "path": "/func33",
                "title": "功能3-3",
                "children":[]
              }
            ]
          }
      ]
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
}
</style>
