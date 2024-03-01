const {
  translateFunc
} = require("../../utils/util");
const app = getApp();

Page({
  data: {
    lastTime: null, // 最后一次翻译时间戳
    prev: app.globalData.current, // 上一次选中的语言
    current: app.globalData.current, // 当前选中的语言 
    content: "", // 翻译内容
    resultTxt: "", // 翻译结果
  },
  onShow: function () {
    const obj = {
      current: app.globalData.current,
    }
    // 上次与本次的目标语言不同，重新翻译
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
    // 找到最后一次翻译记录和当前内容、目标语言匹配是否一致，返回索引
    const index = app.globalData.historys.findIndex(f => f.src === this.data.content && f.index === cur.index);
    // index 为 0，且不存在最后一次翻译时间，则表示一致 
    if (this.data.lastTime !== null && index === 0) {
      return;
    }
    // 调用翻译接口
    translateFunc(this.data.content, 'zh', cur.code).then(res => {
      this.setData({
        resultTxt: res.dst,
        lastTime: Date.now(),
      })
      // 存入 globalData
      app.globalData.historys.unshift({
        ...res,
        index: cur.index,
        x: 0
      });
      // 缓存到本地
      wx.setStorageSync('historys', app.globalData.historys);
    })
  },
  inputHandle() {}
})