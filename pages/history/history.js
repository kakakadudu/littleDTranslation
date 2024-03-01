const {
  resetGlobalDataFunc
} = require("../../utils/util");
const app = getApp();

Page({
  data: {
    list: app.globalData.historys, // 历史记录
    height: app.globalData.height - 50, // 滚动高度
    startX: 0, // 记录每次左滑的起始位 x
  },
  onShow() {
    this.refreshListHandle();
  },
  onHide() {
    // 离开页面
    const data = resetGlobalDataFunc(this.data.list, "x", 0);
    app.globalData.historys = data;
    this.setData({
      list: data,
    })
    wx.setStorageSync('historys', app.globalData.historys);
  },
  // 清除所有记录
  clearListHandle(e, index) {
    if (!this.data.list.length) {
      return;
    }
    const parentEv = this.selectComponent(".parent-event")
    wx.showModal({
      title: '提示',
      content: '您确定要清空所有记录吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除所有
          if (typeof index === "undefined") {
            this.setData({
              list: [],
            })
            app.globalData.historys = [];
            wx.removeStorageSync('historys');
          } else {
            // 删除一项
            const that = this;
            let arr = [...this.data.list];
            arr = resetGlobalDataFunc(arr, "x", 0);
            // 调用父组件的删除子节点方法
            parentEv.deleteChild(index, function () {
              arr.splice(index, 1);
              app.globalData.historys = arr;
              that.setData({
                list: arr,
              })
              wx.setStorageSync('historys', app.globalData.historys);
            })
          }
        }
      }
    })
  },
  // 删除当前项
  clearItemHandle(e) {
    const index = e.currentTarget.dataset.index;
    this.clearListHandle(null, index);
  },
  // 刷新，重新获取全局数据
  refreshListHandle() {
    this.setData({
      list: app.globalData.historys,
    })
  }
})