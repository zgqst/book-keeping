<template>
  <div id="editLabel">
    <nav>
      <router-link to="/detail" class="esc" tag="div">
        <Icon name="esc"></Icon>
      </router-link>
      <div class="tag-wrapper">
        <div class="icon-wrapper">
          <Icon :name="iconName"></Icon>
        </div>
      </div>
    </nav>
    <div class="content">
      <div class="note">
        <span>标签</span>
        <div>{{ tagNameProp }}</div>
      </div>
      <div class="note">
        <span>类型</span>
        <label>
          <select id="type-select" v-model="newRecord.type">
            <option value="-">支出</option>
            <option value="+">收入</option>
          </select>
        </label>
      </div>
      <div class="note">
        <span>日期</span>
        <a-date-picker class="date" :locale="date.locale" :defaultValue="date.now" :format="date.format"
                       @change="changeTime"></a-date-picker>
      </div>
      <div class="note">
        <span>金额</span>
        <label><input type="text" v-model="newRecord.amount" @input="check"></label>
      </div>
      <div class="note">
        <span>备注</span>
        <label><input type="text" placeholder="还没有添加任何备注" v-model="newRecord.message"></label>
      </div>
    </div>
    <button @click="ok" class="ok">完&nbsp;成</button>
    <button @click="dlt" class="dlt">删&nbsp;除</button>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import DatePicker from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import moment from 'moment';
import {default as swal} from 'sweetalert2';

const locale = require('ant-design-vue/lib/date-picker/locale/zh_CN.js').default;

Vue.use(DatePicker);


@Component export default class EditLabel extends Vue {
  tagNameProp = this.$route.params.tagName;
  timeProp = this.$route.query.record;
  temp = /^\w+-\w+-\w+T\w+:\w+:\w+/.exec(this.timeProp as string)!;

  get recordList() {
    return this.$store.getters.recordList();
  }

  get iconName() {
    const tagList = this.$store.getters.tagList();
    for (let i = 0; i < tagList.length; i++) {
      if (tagList[i].name === this.tagNameProp) {
        return tagList[i].icon;
      }
    }
    return 'common';
  }

  get oldRecord() {
    return this.recordList.find((item: RecordItem) => {
      return item.time.includes(this.temp[0]);
    });
  }

  get newRecord() {
    return {...this.oldRecord};
  }

  date: DatePicker = {
    now: moment(this.newRecord.time),
    format: 'YYYY/MM/DD',
    locale: locale
  };

  check(e: any) {
    if (e.target.value.includes('.')) {
      e.target.setAttribute('maxlength', e.target.value.indexOf('.') + 3);
    } else {
      e.target.setAttribute('maxlength', '16');
    }
  }

  changeTime(time: any) {
    if (!time) {
      this.newRecord.time = time;
      return;
    }
    this.newRecord.time = time.format();
  }

  ok() {
    if (!this.newRecord.amount.match(/^\d+(?:\.\d{1,2})?$/)) {
      swal.fire({
        text: `请输入正确的金额！`,
        width: 300,
        confirmButtonText: '确认',
        showClass: {
          popup: 'animate__animated animate__fadeIn animate__faster'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOut animate__faster'
        }
      });
    }
    const index = this.recordList.findIndex((item: RecordItem) => {
      return item.time.includes(this.temp[0]);
    });
    this.recordList.splice(index, 1, this.newRecord);
    this.$store.commit('updateRecordList', this.recordList);
    this.$router.back();
  }

  dlt() {
    const index = this.recordList.findIndex(
        (item: RecordItem) => {
          return item.time.includes(this.temp[0]);
        }
    );

    if (index === -1) {
      return;
    }
    this.recordList.splice(index, 1);
    this.$store.commit('updateRecordList', this.recordList);
    this.$router.back();
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";

#editLabel {
  position: relative;
  height: 100vh;

  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #48dbfb;
    height: 8vh;
    margin-bottom: 50px;

    .esc {
      width: 100vw;
      height: 8vh;
      font-size: 20px;
      position: absolute;
      z-index: 1;
      padding-top: 10px;
      padding-left: 13px;
      padding-bottom: 7px;
      top: 0;
      left: 0;
      cursor: pointer;
      background: #48dbfb;
    }

    .tag-wrapper {
      width: 60px;
      height: 60px;
      display: flex;
      z-index: 2;
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
        border-radius: 50%;
        background: #cfe2fe;
      }
    }
  }

  .content {
    padding-left: 30px;
    padding-right: 30px;

    .note {
      display: flex;
      border-bottom: 1px solid #e1e1fc;
      height: 5vh;
      font-size: $font-size*1.3;
      font-weight: normal;
      color: #333;
      margin-top: 20px;
      padding-left: 40px;

      span {
        margin-right: 40px;
        white-space: nowrap;
        color: #9c9b9b;
      }

      select {
        -webkit-appearance: none;
        border: none;
        font-family: $font-hei;
        background: #fff;
      }

      input {
        width: 50vw;
        border: none;
        font-family: $font-hei;
      }

      .date {
        display: flex;
        align-items: center;
      }
    }

  }

  button {
    position: absolute;
    bottom: 0;
    width: 50vw;
    height: 55px;
    background: #fff;
    border: none;
    font-size: $font-size*1.3;

    &.dlt {
      right: 50vw;
      border: 1px solid #cfcece;
      border-left: none;
      color: red;
      box-shadow: 0 14px 7px -18px #000, 0 -14px 7px -18px #000;
    }

    &.ok {
      left: 50vw;
      border: 1px solid #cfcece;
      border-right: none;
      box-shadow: 0 14px 7px -18px #000, 0 -14px 7px -18px #000;

    }
  }
}


</style>