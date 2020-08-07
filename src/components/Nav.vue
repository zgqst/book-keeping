<template>
  <nav class="nav">
    <router-link to="/detail" class="nav-item" tag="div" >
      <div class="item">
        <Icon name="detail" class="icon"></Icon>
        <div  style="display: inline-block;">明细
        </div>
      </div>
    </router-link>
    <router-link to="/statistic" class="nav-item" tag="div" >
      <div class="item">
        <Icon name="statistic"></Icon>
        <div  style="display: inline-block;">统计</div>
      </div>
    </router-link>
  </nav>
</template>

<script lang="ts">
import {Vue,Component} from 'vue-property-decorator';
@Component
export default class Nav extends Vue{

}
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";

nav {
  display: flex;
  flex-direction: row;
  font-family: $font-hei;
  box-shadow: 0 14px 7px -18px #000;

  .nav-item {
    text-decoration: none;
    color: #2c3e50;
    font-weight: bold;
    font-size: $font-size*1.5;
    width: 50%;
    height: 45px;
    padding-top: 3px;
    padding-bottom: 3px;
    cursor: pointer;
    position: relative;
    .item{
      position: absolute;
      left: 50%;
      top: 10%;
      display: flex;
      transform: translatex(-50%);
    }
  }
}
.router-link-active{
 .item{
   border-bottom: 2px solid ;
 }
}

</style>