const app = getApp();

Component({
  relations: {
    '../leftSliding/leftSliding': {
      type: 'parent', // 关联的目标节点应为父节点
      linked: function (target) {
        // 每次被插入到custom-ul时执行，target是custom-ul节点实例对象，触发在attached生命周期之后
      },
      linkChanged: function (target) {
        // 每次被移动后执行，target是custom-ul节点实例对象，触发在moved生命周期之后
      },
      unlinked: function (target) {
        // 每次被移除时执行，target是custom-ul节点实例对象，触发在detached生命周期之后
      }
    }
  },
  //外部样式类
  externalClasses: ["custom-class"],
  options: {
    styleIsolation: "apply-shared", // 页面 wxss 样式将影响到自定义组件，但自定义组件 wxss 中指定的样式不会影响页面；
  },
  properties: {
    listName: {
      type: String,
      value: ""
    }, // 全剧属性值
    index: Number, // 当前项索引
    item: Object, // 当前项
  },
  data: {
    startX: 0, // 每项滑动的起始位
    deleteClass: "", // 删除时把当前项高度设置为 0
    offsetY:0, // 删除项目之后的所有节点向上偏移量
  },
  methods: {
    // 给当前删除项添加类样式，高度设置为 0
    setDeleteClass() {
      this.setData({
        deleteClass: "remove-item"
      })
    },
    // 设置向上偏移量
    setItemOffsetY(){
      
    },
    // 删除当前项
    deleteHandle() {
      // 触发删除事件
      this.triggerEvent("delete");
    },
    touchstartHandle(e) {
      this.setData({
        startX: e.touches[0].clientX
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
      // 触发刷新事件
      this.triggerEvent("fresh")
    }
  }
})