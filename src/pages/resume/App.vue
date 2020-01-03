<template>
  <div id="app">
    <!--头部-->
    <div class="head">
      <ul>
        <li><router-link to="/about">关于</router-link></li>
        <li><router-link to="/zuopin">作品</router-link></li>
        <li>
          <el-avatar class="head-img" size="large" :src="myImg"></el-avatar>
        </li>
        <li>能力</li>
        <li>联系</li>
      </ul>
    </div>
    <!--主页面-->
    <vue-particles
      color="#ffffff"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#ffffff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="app-bg"
    >
    </vue-particles>
    <router-view class="app-router"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      myImg: require('./image/me.png')
    }
  }
}
</script>

<style lang="scss">
$head-height: 80px;

html,body {
  margin: 0;
  overflow: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.app-bg {
  background-image: url("./image/home-bg.jpg");
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.app-router {
  position: absolute;
  top: 100px;
  padding: 40px;
  color: #fff;
  width: 96%;
  height: calc(100vh - 100px);
}

.head {
  height: $head-height;
  width: 100%;
  position: fixed;
  z-index: 100;
  text-align: center;
  top: 0;
  background-color: black;
  color: #fff;
  & ul {
    list-style: none;
    margin: 0;
    line-height: $head-height;
    height: $head-height;
    display: flex;
    justify-content: center;
    align-content: center;
    & li {
      display: block;
      float: left;
      font-size: 24px;
      width: 7%;
      & a {
        color: #fff;
        text-decoration: none;
        cursor: pointer;
        &:hover{
          color: #99ff8e;
        }
      }
      .router-link-active {
        color: #99ff8e;
      }
    }
  }
  &-img {
    width: 100px !important;
    height: 100px !important;
  }
}
</style>
