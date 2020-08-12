const localStorageName = 'recordList';

const recordListModel = {
  clone(data: RecordItem) {
    return {...data};

  },
  fetch(): RecordItem[] {
    return JSON.parse(window.localStorage.getItem(localStorageName) || '[]');
  },
  save(data: RecordItem[]) {
    window.localStorage.setItem(localStorageName, JSON.stringify(data));
  }
};

export default recordListModel;