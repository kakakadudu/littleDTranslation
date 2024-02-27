// app.js
App({
  onLaunch() {
    const list = wx.getStorageSync('historys')
    this.globalData.historys = list ? list : [];
    // 获取窗口高度
    this.globalData.height = wx.getSystemInfoSync().windowHeight;
  },
  globalData: {
    height: 0, //窗口高度
    // 语言列表
    languages: [{
        text: "中文",
        code: "zh",
        index: 0
      },
      {
        text: "粤语",
        code: "yue",
        index: 1
      },
      {
        text: "文言文",
        code: "wyw",
        index: 2
      },
      {
        text: "英语",
        code: "en",
        index: 3
      },
      {
        text: "西班牙语",
        code: "spa",
        index: 4
      },
      {
        text: "日语",
        code: "jp",
        index: 5
      },
      {
        text: "韩语",
        code: "kor",
        index: 6
      },
      {
        text: "阿拉伯语",
        code: "ara",
        index: 7
      },
      {
        text: "荷兰语",
        code: "nl",
        index: 8
      },
      {
        text: "德语",
        code: "de",
        index: 9
      },
    ],
    // 当前选中的目标语言
    current: {
      text: "英语",
      code: "en",
      index: 3
    },
    historys: [], // 翻译记录
  }
})