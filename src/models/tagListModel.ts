const localStorageName = 'tagList';
const local = window.localStorage.getItem(localStorageName);
const tagList: TagObj[] = [{name: '三餐', icon: 'meal'}, {name: '零食', icon: 'snack'}, {
  name: '衣服',
  icon: 'clothes'
}, {
  name: '孩子',
  icon: 'child'
}, {name: '宠物', icon: 'cat'}, {name: '银行', icon: 'bank'}, {name: '交通', icon: 'car'}];

const tagListModel = {
  clone(data: TagObj): TagObj {
    return {...data};
  },
  fetch(): TagObj[] {
    return local ? JSON.parse(local) : tagList;
  },
  mergeAndSave(data: TagObj) {
    const temp = local ? JSON.parse(local) : tagList;
    if(temp.some((item: TagObj)=>{return item.name===data.name})){
      throw new Error('该标签已存在！');
    }
    temp.push(data);
    window.localStorage.setItem(localStorageName, JSON.stringify(temp));
    alert('添加成功!');
  }
};

export default tagListModel;