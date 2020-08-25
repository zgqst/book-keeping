<template>
  <div id="labels">
    <nav>
      <Icon name="esc" @click.native="back" class="backButton"></Icon>
      <div class="head">添加标签</div>
      <div class="tip" @click="ok">确定</div>
    </nav>
    <div class="wrapper">
      <div class="title">三餐</div>
      <ul>
        <li v-for="item in labels.meals" :key="item.name">
          <div class="tag-wrapper" @click="choose">
            <div class="icon-wrapper">
              <Icon :name="item.icon"></Icon>
            </div>
            <div>{{ item.name }}</div>
          </div>
        </li>
      </ul>
      <div class="title">购物</div>
      <ul>
        <li v-for="item in labels.shopping" :key="item.name">
          <div class="tag-wrapper" @click="choose">
            <div class="icon-wrapper">
              <Icon :name="item.icon"></Icon>
            </div>
            <div>{{ item.name }}</div>
          </div>
        </li>
      </ul>
      <div class="title">娱乐</div>
      <ul>
        <li v-for="item in labels.entertainment" :key="item.name">
          <div class="tag-wrapper" @click="choose">
            <div class="icon-wrapper">
              <Icon :name="item.icon"></Icon>
            </div>
            <div>{{ item.name }}</div>
          </div>
        </li>
      </ul>
      <div class="title">育儿</div>
      <ul>
        <li v-for="item in labels.child" :key="item.name">
          <div class="tag-wrapper" @click="choose">
            <div class="icon-wrapper">
              <Icon :name="item.icon"></Icon>
            </div>
            <div>{{ item.name }}</div>
          </div>
        </li>
      </ul>
      <div class="title">出行</div>
      <ul>
        <li v-for="item in labels.traffic" :key="item.name">
          <div class="tag-wrapper" @click="choose">
            <div class="icon-wrapper">
              <Icon :name="item.icon"></Icon>
            </div>
            <div>{{ item.name }}</div>
          </div>
        </li>
      </ul>
      <div class="title">医疗</div>
      <ul>
        <li v-for="item in labels.hospital" :key="item.name">
          <div class="tag-wrapper" @click="choose">
            <div class="icon-wrapper">
              <Icon :name="item.icon"></Icon>
            </div>
            <div>{{ item.name }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {default as swal} from 'sweetalert2';


@Component export default class Labels extends Vue {
  newTag: TagObj = {name: '', icon: ''};

  labels = {
    meals: [{name: '早餐', icon: 'breakfast'}, {name: '午餐', icon: 'lunch'}, {name: '晚餐', icon: 'dinner'}, {
      name: '水果',
      icon: 'fruit'
    }, {name: '咖啡', icon: 'coffee'}],
    shopping: [{name: '球鞋', icon: 'shoes'}, {name: '家具', icon: 'furniture'}, {
      name: '电子产品',
      icon: 'Electronics'
    }, {name: '虚拟货币', icon: 'qbi'}, {name: '日用品', icon: 'daily'}, {name: '化妆品', icon: 'cosmetics'}],
    entertainment: [{name: '游戏', icon: 'game'}, {name: '电影', icon: 'movie'}, {name: 'K歌', icon: 'sing'}, {
      name: '聚会',
      icon: 'party'
    }, {name: '运动', icon: 'sport'}],
    child: [{name: '牛奶', icon: 'milk'}, {name: '玩具', icon: 'toy'}, {name: '疫苗', icon: 'yimiao'}, {
      name: '教育',
      icon: 'education'
    }],
    traffic: [{name: '公交车', icon: 'bus'}, {name: '停车费', icon: 'stopBus'}, {name: '飞机', icon: 'plane'}, {
      name: '火车',
      icon: 'train'
    }, {name: '油费', icon: 'oil'}]
    ,
    hospital: [{name: '治病', icon: 'treat'}, {name: '手术', icon: 'operation'}, {name: '药品', icon: 'drugs'}]
  };

  back() {
    this.$router.push('/detail/add');
  }

  choose(event: MouseEvent) {
    const icon = (event.currentTarget as HTMLDivElement).firstElementChild as HTMLElement;
    const allIcon = document.querySelectorAll('.icon-wrapper');
    const tagName = ((event.currentTarget as any).lastChild as any).textContent.trim();
    if (icon.className === 'icon-wrapper') {
      for (let i = 0; i < allIcon.length; i++) {
        allIcon[i].className = 'icon-wrapper';
      }
      icon.className = 'icon-wrapper selected';
    }
    for (const key in this.labels) {
      const temp = this.labels[key].find((item: TagObj) => {
        return item.name === tagName;
      });
      if (temp) {
        this.newTag = temp;
      }
    }
  }

  ok() {
    const temp = {...this.newTag};
    if (!temp.name) {
      swal.fire({
        text: '请选择标签！',
        width: 300,
        confirmButtonText: '确认',
        showClass: {
          popup: 'animate__animated animate__fadeIn animate__faster'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOut animate__faster'
        }
      });
      return;
    }
    try {
      this.$store.commit('updateTadList', temp);
    } catch (error) {
      swal.fire({
        text: `${error.message}`,
        width: 300,
        confirmButtonText: '确认',
        showClass: {
          popup: 'animate__animated animate__fadeIn animate__faster'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOut animate__faster'
        }
      });
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _self = this;
    swal.fire({
      text: `添加成功！`,
      width: 300,
      confirmButtonText: '确认',
      showClass: {
        popup: 'animate__animated animate__fadeIn animate__faster'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut animate__faster'
      },
      onClose: function () {
        _self.$router.back();
      }
    });
  }


}
</script>
<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
@import "~animate.css";

#labels {
  height: 100vh;

  nav {
    @extend %clearFix;
    width: 100vw;
    height: 8vh;
    font-size: 20px;
    position: relative;
    padding-top: 10px;
    padding-left: 13px;
    padding-bottom: 7px;
    top: 0;
    left: 0;
    background: #48dbfb;
    display: flex;

    .backButton {
      cursor: pointer;
    }

    .head {
      margin-top: 2px;
      cursor: default;
    }

    .tip {
      margin: 2px 25px 0 auto;
      cursor: pointer;
    }

  }

  .wrapper {
    height: 92vh;
    overflow: auto;

    .title {
      color: #778899;
      font-size: $font-size*1.2;
      font-weight: bold;
      padding-left: 10px;
      padding-top: 5px;
      border-top: 2px #e1e1fc solid;


      &:first-child {
        border: none;
      }
    }


    ul {
      display: flex;
      flex-wrap: wrap;

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
}
</style>