const app = getApp();

Component({
  relations: {
    '../leftSliding/leftSliding': {
      type: 'parent', // 关联的目标节点应为父节点
    }
  },
  //外部样式类
  externalClasses: ["custom-class"],
  options: {
    styleIsolation: "apply-shared", // 页面 wxss 样式将影响到自定义组件，但自定义组件 wxss 中指定的样式不会影响页面；
  },
  properties: {
    listName: { // 在 globalData 里的属性
      type: String,
      value: "",
    }, // 全剧属性值
    index: Number, // 当前项索引
    item: Object, // 当前项
    height: { // 每个项目的高度
      type: Number,
      value: 75,
    }
  },
  data: {
    startX: 0, // 每项滑动的起始位 
    isAnimation: true,
    offsetY: 0, // 开始删除前 向下偏移，删除完成恢复偏移量
    duration: 0, // 动画时间 
  },
  methods: {
    /**
     * 设置删除节点后的节点的偏移量
     * @param {*} y 纵向偏移量
     * @param {*} duration 延迟时间
     */
    setTranslateProps(y, duration) {
      this.setData({
        offsetY: y,
        duration,
      });
    },
    // 设置左滑显示删除按钮的动画是否显示
    setAnimationShow(isShow) {
      this.setData({
        isAnimation: isShow,
      })
    },
    // 删除当前项
    deleteHandle() {
      // 触发删除事件
      this.triggerEvent("delete");
    },
    touchstartHandle(e) {
      this.setData({
        startX: e.touches[0].clientX,
      })
    },
    touchendHandle(e) {
      const endX = e.changedTouches[0].clientX;
      const dir = endX - this.data.startX;
      // 获取目标元素的索引
      const index = this.properties.index;
      // 拿到 app.js 里全局属性名
      const name = this.properties.listName;
      const currentItem = app.globalData[name].find((child, idx) => idx === index);
      // 判断滑动方向
      if (dir > 0) {
        currentItem.x = 0;
      } else {
        if (dir < -30) {
          currentItem.x = -120;
        } else {
          currentItem.x = 0;
        }
      }
      // 触发刷新
      this.triggerEvent("fresh");
    }
  }
})