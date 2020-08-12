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
import {Vue, Component, Prop} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';

@Component export default class Tags extends Vue {

  tagList: TagObj[] = tagListModel.fetch();

  @Prop(String) value = '';

  choose(event: MouseEvent) {
    const icon = (event.currentTarget as HTMLDivElement).firstElementChild as HTMLElement;
    const allIcon = document.querySelectorAll('.icon-wrapper');
    const tagName = ((event.currentTarget as any).lastChild as any).textContent.trim();
    this.$emit('update:value', tagName);
    if (icon.className === 'icon-wrapper') {
      for (let i = 0; i < allIcon.length - 1; i++) {
        allIcon[i].className = 'icon-wrapper';
      }
      icon.className = 'icon-wrapper selected';
    }
  }

  addNewTag() {
    this.$router.push('/detail/add/labels');
  }

}
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";

#tags {
  height: 60vh;
  overflow: auto;

  ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10vh;

    li {
      margin-left: 4vw;
      margin-bottom: 15px;
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