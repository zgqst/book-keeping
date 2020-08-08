<template>
  <div id="tags">
    <ul class="tagList">
      <li v-for="item in tagList" :key="item.name">
        <div class="tag-wrapper" @click="choose">
          <div class="icon-wrapper">
            <Icon :name="item.icon"></Icon>
          </div>
          {{ item.name }}
        </div>
      </li>
      <li>
        <div class="tag-wrapper" @click="addNewTag">
          <div class="icon-wrapper">
            <Icon name="add"></Icon>
          </div>
     添加
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component export default class Tags extends Vue {

  tagList: { name: string; icon: string }[] = [{name: '三餐', icon: 'meal'}, {name: '零食', icon: 'snack'}, {
    name: '衣服',
    icon: 'clothes'
  }, {
    name: '孩子',
    icon: 'child'
  }, {name: '宠物', icon: 'cat'}, {name: '银行', icon: 'bank'}, {name: '交通', icon: 'car'}];

  choose(event: MouseEvent) {
    const icon = (event.currentTarget as HTMLDivElement).firstElementChild as HTMLElement;
    const allIcon = document.querySelectorAll('.icon-wrapper');
    if (icon.className === 'icon-wrapper') {
      for (let i = 0; i < allIcon.length - 1; i++) {
        allIcon[i].className = 'icon-wrapper';
      }
      icon.className = 'icon-wrapper selected';
    }
  }

  addNewTag() {
    const newTag = {name: '', icon: ''};
    newTag.name = prompt('输入标签内容') as string;
    if (!newTag.name) {
      alert('添加失败！内容不可以为空');
      return;
    }
    for (let i = 0; i < this.tagList.length - 1; i++) {
      if (this.tagList[i].name === newTag.name) {
        alert('添加失败！不可以添加重复标签！');
        return;
      }
    }
    this.tagList.push(newTag);
  }

}
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";

#tags {
  height: 100%;

  ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10vh;

    li {
      margin-left: 4vw;
      width: 20vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .tag-wrapper {
        width: 60px;
        height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: $font-size;
        color: #333;
        cursor: pointer;

        .icon-wrapper {
          width: 40px;
          height: 40px;
          font-size: $font-size*1.3;
          display: flex;
          justify-content: center;
          align-items: center;

          &.selected {
            border-radius: 50%;
            background: #cfe2fe;
          }


        }
      }
    }
  }
}
</style>