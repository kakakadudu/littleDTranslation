const {
  translateFunc
} = require("../../utils/util");
const app = getApp();

Page({
  data: {
    prev: app.globalData.current, // 上一次选中的语言
    current: app.globalData.current, // 当前选中的语言
    content: "", // 翻译内容
    resultTxt: "", // 翻译结果
  },
  onShow: function () {
    const obj = {
      current: app.globalData.current
    }
    // 上次与本次的目标语言不同
    if (this.data.prev.index !== app.globalData.current.index) {
      // 重新调用翻译
      this.translateHandle(null, obj.current);
      obj.prev = app.globalData.current;
    }
    this.setData(obj)
  },
  // 切换目标语言
  changeToHandle() {
    wx.navigateTo({
      url: '/pages/change/change',
    })
  },
  // 翻译处理
  translateHandle(e, cur) {
    if (!this.data.content) {
      return;
    }
    cur = cur ? cur : this.data.current;
    translateFunc(this.data.content, "zh", cur.code).then(res => {
      this.setData({
        resultTxt: res.dst
      })
      // 存入 globalData
      app.globalData.historys.unshift({
        ...res,
        x: 0
      });
      // 缓存到本地
      wx.setStorageSync('historys', app.globalData.historys);
    })
  },
  inputHandle() {}
})