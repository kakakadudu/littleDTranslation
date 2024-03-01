const app = getApp();

Page({
  data: {
    langs: app.globalData.languages, // 语言列表
    current: app.globalData.current, // 当前选中的语言
    height: app.globalData.height, // 窗口高度
  },
  onShow() {
    this.setData({
      langs: app.globalData.languages,
      current: app.globalData.current,
    })
  },
  // 选择目标语言
  selectedItemHandle(e) {
    const index = e.currentTarget.dataset.index;
    if (index === 0) {
      wx.showToast({
        title: '不能选择中文',
        icon: "error",
      })
      return;
    }
    app.globalData.current = app.globalData.languages[index];
    this.setData({
      current: app.globalData.current,
    })
  }
})