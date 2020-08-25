import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    initTagList: [{name: '三餐', icon: 'meal'}, {name: '零食', icon: 'snack'}, {
      name: '衣服',
      icon: 'clothes'
    }, {
      name: '孩子',
      icon: 'child'
    }, {name: '宠物', icon: 'cat'}, {name: '银行', icon: 'bank'}, {name: '交通', icon: 'car'}],
    time: {year: moment().year(), month: moment().month() + 1},
    detailList: {}
  },
  getters: {
    recordList() {
      return () => {
        return JSON.parse(window.localStorage.getItem('recordList') || '[]');
      };
    },
    tagList(state) {
      return () => {
        const local = window.localStorage.getItem('tagList');
        if (local) {
          return JSON.parse(local);
        } else {
          return state.initTagList;
        }
      };
    },
  },
  mutations: {
    updateRecordList(state, data) {
      window.localStorage.setItem('recordList', JSON.stringify([...data]));
    },
    updateTadList(state, data: TagObj) {
      const local = window.localStorage.getItem('tagList');
      let temp;
      if (local) {
        temp = JSON.parse(local);
      } else {
        temp = state.initTagList;
      }
      if (temp.some((item: TagObj) => {
        return item.name === data.name;
      })) {
        throw new Error('该标签已存在！');
      }
      temp.push(data);
      window.localStorage.setItem('tagList', JSON.stringify(temp));
    },
    setTime(state, data) {
      state.time.year = data.year;
      state.time.month = data.month;
    },
    getDetailList(state) {
      const recordList = store.getters.recordList();
      const duplicated = [...recordList];
      const theMonthRecordList = duplicated.filter(item => {
        return moment(item.time).isSame([state.time.year, state.time.month - 1], 'month');
      });
      const sortedList = theMonthRecordList.sort((a: RecordItem, b: RecordItem) => {
        return moment(b.time).valueOf() - moment(a.time).valueOf();
      });
      const temp: DetailListObj = {};
      for (let i = 0; i < sortedList.length; i++) {
        const calendar = moment(sortedList[i].time).calendar(null, {
          sameDay: '[今天]',
          nextDay: '[明天]',
          nextWeek: 'YYYY/MM/DD',
          lastDay: '[昨天]',
          lastWeek: 'YYYY/MM/DD',
          sameElse: 'YYYY/MM/DD'
        });
        if (!temp[calendar]) {
          temp[calendar] = [];
          temp[calendar].push(sortedList[i]);
        } else {
          temp[calendar].push(sortedList[i]);
        }
      }
      state.detailList = temp;
    }
  }
});
export default store;