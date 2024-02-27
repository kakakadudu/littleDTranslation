const app = getApp();

Page({
  data: {
    langs: app.globalData.languages, // 语言列表
    current: app.globalData.current, // 当前选中的语言
    height: app.globalData.height, // 窗口高度
  },
  onShow() {
    this.setData({
      langs: app.globalData.languages
    })
  },
  // 选择目标语言
  selectedItemHandle(e) {
    const index = e.currentTarget.dataset.index;
    app.globalData.current = app.globalData.languages[index];
    this.setData({
      current: app.globalData.current,
    })
  }
})